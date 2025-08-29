import { Component } from '@angular/core';
import { MeterModel } from '../../models/meter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  meters = ['Văn Đẩu 8', 'Văn Đẩu 9', 'Văn Đẩu 10'];
  selectedMeter = this.meters[0];
  selectedDate = this.getToday();

  days = [
    '04/03/2025', '05/03/2025', '06/03/2025', '07/03/2025', '08/03/2025', '09/03/2025', '10/03/2025'
  ];

  models: MeterModel[] = [
    {
      name: 'LSTM_minflow',
      values: [
        'Chưa có dữ liệu', 'Chưa có dữ liệu', 'Nghi ngờ thấp', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao'
      ]
    },
    {
      name: 'LSTM_maxflow',
      values: [
        'Chưa có dữ liệu', 'Chưa có dữ liệu', 'Nghi ngờ thấp', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao'
      ]
    },
    {
      name: 'Isolation_minflow',
      values: [
        'Nghi ngờ thấp', 'Nghi ngờ thấp', 'Nghi ngờ thấp', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao'
      ]
    },
    {
      name: 'Isolation_maxflow',
      values: [
        'Nghi ngờ thấp', 'Nghi ngờ thấp', 'Nghi ngờ thấp', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao', 'Nghi ngờ cao'
      ]
    },
    {
      name: 'Kết luận',
      values: [
        'Chưa xác định', 'Chưa xác định', 'Nghi thấp', 'Nghi ngờ trung bình', 'Nghi ngờ trung bình', 'Nghi ngờ trung bình', 'Nghi ngờ trung bình'
      ]
    }
  ];

  getToday(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  onMeterChange(meter: string) {
    this.selectedMeter = meter;
    // TODO: Load lại models/days nếu dữ liệu thay đổi theo meter
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    // TODO: Filter hoặc load lại models nếu cần
  }
}