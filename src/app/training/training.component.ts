import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Column } from './column.model';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  dataSource: Exercise[];
  exerciseSubscription: Subscription;
  dataSourceSubscription: Subscription;
  tableData: Exercise[];
  columns: Column[] = [
    {
      columnDef: 'date',
      header: 'Date',
      isSortable: true,
      cell: (element: any) => `${element.date}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      isSortable: true,
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'duration',
      header: 'Duration',
      isSortable: true,
      cell: (element: any) => `${element.duration}`,
    },
    {
      columnDef: 'calories',
      header: 'Calories',
      isSortable: true,
      cell: (element: any) => `${element.calories}`,
    },
    {
      columnDef: 'state',
      header: 'State',
      isSortable: false,
      cell: (element: any) => `${element.state}`,
    },
  ];
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (exercise) => {
        if (exercise) this.ongoingTraining = true;
        else this.ongoingTraining = false;
      }
    );
    this.dataSourceSubscription = this.trainingService
      .getCompletedOrCancelledExercises()
      .subscribe((tableData) => {
        this.tableData = tableData;
      });
  }
  ngOnDestroy() {
    this.dataSourceSubscription.unsubscribe();
  }
}
