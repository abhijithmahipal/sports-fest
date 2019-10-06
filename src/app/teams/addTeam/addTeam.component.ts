import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addTeam',
  templateUrl: './addTeam.component.html',
  styleUrls: ['./addTeam.component.css']
})
export class AddTeamComponent implements OnInit {

  constructor(private service: TeamService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      name: '',
      captain: '',
      manager1: '',
      manager2: '',
    }
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('teams').add(data);
    else
      this.firestore.doc('teams/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Team Registration');
  }

}
