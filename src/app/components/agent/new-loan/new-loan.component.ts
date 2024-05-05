import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from 'src/app/core/agent.service';
import { AuthService } from 'src/app/core/auth.service';
import { storage } from '../../../../../firebase';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss'],
})
export class NewLoanComponent implements OnInit {
  currentAgent: any;
  newLoanForm: FormGroup;
  panFile: any;
  panDataURL: any;
  aadhaarFile: any;
  aadhaarDataURL: any;
  loading: boolean = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public agentSrvc: AgentService
  ) {
    this.newLoanForm = this.fb.group({
      agentMail: ['', Validators.required],
      customerName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      date: [new Date().getTime(), Validators.required],
      loanItem: ['', Validators.required],
      itemPrice: ['', Validators.required],
      downPayment: ['', Validators.required],
      tenure: ['', Validators.required],
      emiStarted: [false, Validators.required],
      panUrl: ['', Validators.required],
      aadhaarUrl: ['', Validators.required],
      status: ['fresh', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentAgent = this.authService.currentUser;
    this.newLoanForm.get('agentMail')?.setValue(this.currentAgent.email);
  }

  onPanUpload(event: any) {
    this.panFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.panFile);
    reader.onload = (e: any) => {
      this.panDataURL = e.target.result;
    };
  }

  onAadhaarUpload(event: any) {
    this.aadhaarFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.aadhaarFile);
    reader.onload = (e: any) => {
      this.aadhaarDataURL = e.target.result;
    };
  }

  raiseReq() {
    this.loading = true;
    let customer = {
      userType: 'customer',
      fullname: this.newLoanForm.value.customerName,
      email: this.newLoanForm.value.customerEmail,
    };
    this.authService
      .fetchCustomerByEmail(customer.email)
      .subscribe((res: any) => {
        if (!res.length) {
          this.agentSrvc.addNewCustomer(customer).subscribe((res) => {});
        }

        const panStorageRef = ref(
          storage,
          `/loan-docs/${this.newLoanForm.value.customerName}-${Date.now()}-${
            this.panFile.name
          }`
        );
        const aadhaarStorageRef = ref(
          storage,
          `/loan-docs/${this.newLoanForm.value.customerName}-${Date.now()}-${
            this.aadhaarFile.name
          }`
        );

        const uploadPromises = [
          uploadString(panStorageRef, this.panDataURL, 'data_url'),
          uploadString(aadhaarStorageRef, this.aadhaarDataURL, 'data_url'),
        ];

        Promise.all(uploadPromises)
          .then((snapshots) => {
            const panUrl = getDownloadURL(snapshots[0].ref);
            const aadhaarUrl = getDownloadURL(snapshots[1].ref);

            return Promise.all([panUrl, aadhaarUrl]);
          })
          .then((downloadUrls) => {
            this.newLoanForm.get('panUrl')?.setValue(downloadUrls[0]);
            this.newLoanForm.get('aadhaarUrl')?.setValue(downloadUrls[1]);

            this.agentSrvc
              .addNewLoan(this.newLoanForm.value)
              .subscribe((res: any) => {
                this.loading = false;
                alert(
                  `${res.loanItem} of amount ${res.itemPrice} registered successfully`
                );
                this.newLoanForm.reset();
              });
          })
          .catch((error) => {
            console.error('Error during upload or download:', error);
          });
      });
  }
}
