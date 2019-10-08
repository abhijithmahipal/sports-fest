import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-team-list',
  templateUrl: './teamList.component.html',
  styleUrls: ['./teamList.component.css']
})
export class TeamListComponent implements OnInit {

  list: Team[];
  constructor(private service: TeamService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  async ngOnInit() {
    this.service.getTeams().subscribe(res => this.list = res);
  }

  // onEdit(emp: Employee) {
  //   this.service.formData = Object.assign({}, emp);
  // }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this team?")) {
      this.firestore.doc('teams/' + id).delete();
      this.toastr.warning('Deleted successfully','Team Registration');
    }
  } 

}
