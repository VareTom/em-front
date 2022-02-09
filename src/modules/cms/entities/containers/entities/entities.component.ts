import { Component, OnInit } from '@angular/core';
import { CreateEntityDialogComponent } from 'src/shared/components/create-entity-dialog/create-entity-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }
  
  onCreate(): void {
    this.dialogService.open(CreateEntityDialogComponent, {
      dialogClass: 'medium-dialog'
    });
  }
}
