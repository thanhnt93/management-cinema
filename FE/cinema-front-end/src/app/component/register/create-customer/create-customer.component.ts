import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ICustomer} from '../../../model/i-customer';
import {User} from '../../../dto/user';
import {CustomerService} from '../../../service/customer.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  submitted = false;
  customerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern(
        '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
        'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]
      ),
      dayOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required),
      idCard: new FormControl('', [Validators.required,
        Validators.pattern('^(\\d{9}|\\d{12})$')]),
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required,
        Validators.pattern('^([+84][\\d]{9})|([0]\\d{9})$')]),
      username: new FormControl('', [Validators.required,
        Validators.pattern('[a-zA-Z0-9' +
          ' _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
          'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'),
        Validators.minLength(3)]),
      passGroup: new FormGroup(
        {
          password: new FormControl('', [Validators.required,
            Validators.pattern('^[0-9a-zA-Z]{6,32}$')]),
          confirmPassword: new FormControl('', [Validators.required,
            Validators.pattern('^[0-9a-zA-Z]{6,32}$')])
        }, this.checkPasswords),
      customerType: new FormGroup({
        id: new FormControl(4)
      })
    });

  user = new User();
  customer: ICustomer;


  constructor(private customerService: CustomerService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Đăng kí');
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.submitted = true;
    this.customer = this.customerForm.value;
    this.user.username = this.customerForm.value.username;
    this.user.password = this.customerForm.get('passGroup').get('password').value;
    this.customer.user = this.user;
    console.log(this.customerForm.get('passGroup').get('password').value);
    this.customerService.saveCustomer(this.customer).subscribe(value => {
      console.log(value);
      Swal.fire({
        icon: 'success',
        title: 'Đăng Ký Thành Công!',
        text: 'Tài Khoản: ' + this.user.username,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat`
      });
      this.customerForm.reset();
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.password === passwordCheck.confirmPassword ? null : {notSame: true});
  }

}
