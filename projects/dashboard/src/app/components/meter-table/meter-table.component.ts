import { Component, Input } from '@angular/core';
import { MeterModel } from '../../models/meter.model';

@Component({
  selector: 'app-meter-table',
  templateUrl: './meter-table.component.html',
  styleUrls: ['./meter-table.component.scss']
})
export class MeterTableComponent {
  @Input() meter: string = '';
  @Input() days: string[] = [];
  @Input() models: MeterModel[] = [];
}