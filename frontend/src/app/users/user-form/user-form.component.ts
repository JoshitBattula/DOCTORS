import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import User from '../../types/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formBuilder=inject(FormBuilder);
  userForm :FormGroup=this.formBuilder.group({
    name:['',(Validators.required)],
    email:['',(Validators.required,Validators.email)],
    password:['',(Validators.required,Validators.minLength(8))],
  });
  userService=inject(UserService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  editUserId!: string;
  ngOnInit(){
    this.editUserId = this.route.snapshot.params["id"];
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe((result)=>{
        this.userForm.patchValue(result);
      });
    }
  }
  navigateByUrl: any;
  addUser(){
    if(this.userForm.invalid){
      alert("invalid data");
      return;
    }
    const model:User = this.userForm.value;
    console.log(this.userForm.value);
    this.userService.addUser(model).subscribe(result=>{
        alert("Added Successfully");
        this.router.navigateByUrl('/users');
    })
  }
  updateUser(){
    if(this.userForm.invalid){
      alert("invalid data");
      return;
    }
    const model:User = this.userForm.value;
    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
        alert("Updated Successfully");
        this.router.navigateByUrl('/users');
    })
  }
}
