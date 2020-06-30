import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.css']
})
export class SegmentedControlComponent implements OnInit, OnDestroy {

  @Input("choices") choices: Array<string>;
  @Output("selectionMade") selectionEmitter: EventEmitter<string> = new EventEmitter();

  public selectedChoice: string;
  public darkThemeOn: boolean;

  private subscriptions: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.selectedChoice = this.choices[0];
    this.selectionEmitter.emit(this.selectedChoice);

    this.subscriptions = new Subscription();
    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => this.darkThemeOn = on));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public select(choice: string): void {
    this.selectedChoice = choice;
    this.selectionEmitter.emit(choice);
  }

  public getSelectedChoice(): string {
    return this.selectedChoice;
  }
}
