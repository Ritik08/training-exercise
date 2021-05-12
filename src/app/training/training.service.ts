import { Exercise } from './exercise.model';
import { BehaviorSubject, Subject } from 'rxjs';
export class TrainingService {
  private availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 60, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 90, calories: 18 },
    { id: 'cardio', name: 'Cardio', duration: 60, calories: 8 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  pastExercises = new BehaviorSubject<Exercise[]>([
    {
      id: 'one',
      name: 'Past',
      duration: 0,
      calories: 0,
      date: null,
      state: null,
    },
  ]);
  getAvailableExercises() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(
      (ex) => ex.id == selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.pastExercises.next(this.exercises.slice());
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration:
        Math.round(this.runningExercise.duration * (progress / 100) * 100) /
        100,
      calories:
        Math.round(this.runningExercise.calories * (progress / 100) * 100) /
        100,
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.pastExercises.next(this.exercises.slice());
  }
  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises() {
    this.pastExercises.next(this.exercises.slice());
    return this.pastExercises;
  }
}
