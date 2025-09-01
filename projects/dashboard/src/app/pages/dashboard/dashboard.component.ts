import { Component, OnInit } from '@angular/core';
import { MeterModel, MeterData } from '../../models/meter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  meters = ['Văn Đẩu 8', 'Văn Đẩu 9', 'Văn Đẩu 10'];
  selectedMeter = this.meters[0];
  selectedDate = this.getToday();

  days = [
    '04/03/2025', '05/03/2025', '06/03/2025', '07/03/2025', '08/03/2025', '09/03/2025', '10/03/2025'
  ];

  // Dữ liệu mẫu cho từng ngày
  meterDataByDate: { [key: string]: MeterModel[] } = {};

  // Dữ liệu hiện tại để hiển thị
  currentModels: MeterModel[] = [];
  currentDays: string[] = [];

  ngOnInit() {
    this.initializeData();
    this.updateCurrentData();
  }

  initializeData() {
    // Khởi tạo dữ liệu mẫu cho từng ngày
    this.days.forEach((day, index) => {
      this.meterDataByDate[day] = [
        {
          name: 'LSTM_minflow',
          values: this.generateRandomValues(index)
        },
        {
          name: 'LSTM_maxflow',
          values: this.generateRandomValues(index)
        },
        {
          name: 'Isolation_minflow',
          values: this.generateRandomValues(index)
        },
        {
          name: 'Isolation_maxflow',
          values: this.generateRandomValues(index)
        },
        {
          name: 'Kết luận',
          values: this.generateConclusionValues(index)
        }
      ];
    });
  }

  generateRandomValues(dayIndex: number): string[] {
    const values = ['Chưa có dữ liệu', 'Nghi ngờ thấp', 'Nghi ngờ cao'];
    const result = [];
    
    for (let i = 0; i < 7; i++) {
      if (i < dayIndex) {
        result.push('Chưa có dữ liệu');
      } else if (i === dayIndex) {
        result.push(values[Math.floor(Math.random() * values.length)]);
      } else {
        result.push(values[Math.floor(Math.random() * values.length)]);
      }
    }
    
    return result;
  }

  generateConclusionValues(dayIndex: number): string[] {
    const values = ['Chưa xác định', 'Nghi ngờ thấp', 'Nghi ngờ trung bình', 'Nghi ngờ cao'];
    const result = [];
    
    for (let i = 0; i < 7; i++) {
      if (i < dayIndex) {
        result.push('Chưa xác định');
      } else if (i === dayIndex) {
        result.push(values[Math.floor(Math.random() * values.length)]);
      } else {
        result.push(values[Math.floor(Math.random() * values.length)]);
      }
    }
    
    return result;
  }

  getToday(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  onMeterChange(meter: string) {
    this.selectedMeter = meter;
    this.updateCurrentData();
  }

  onDateChange(date: string) {
    this.selectedDate = date;
    this.updateCurrentData();
  }

  updateCurrentData() {
    // Lọc dữ liệu theo ngày được chọn
    const selectedDateStr = this.formatDateForDisplay(this.selectedDate);
    
    // Tạo dữ liệu mới dựa trên ngày được chọn
    this.currentModels = this.createModelsForSelectedDate(this.selectedDate);
    
    // Cập nhật danh sách ngày để hiển thị (7 ngày từ ngày được chọn)
    this.currentDays = this.generateDaysFromSelectedDate(this.selectedDate);
  }

  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  generateDaysFromSelectedDate(selectedDate: string): string[] {
    const date = new Date(selectedDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      currentDate.setDate(date.getDate() + i);
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      days.push(`${day}/${month}/${year}`);
    }
    
    return days;
  }

  createDefaultModels(): MeterModel[] {
    return [
      {
        name: 'LSTM_minflow',
        values: Array(7).fill('Chưa có dữ liệu')
      },
      {
        name: 'LSTM_maxflow',
        values: Array(7).fill('Chưa có dữ liệu')
      },
      {
        name: 'Isolation_minflow',
        values: Array(7).fill('Chưa có dữ liệu')
      },
      {
        name: 'Isolation_maxflow',
        values: Array(7).fill('Chưa có dữ liệu')
      },
      {
        name: 'Kết luận',
        values: Array(7).fill('Chưa xác định')
      }
    ];
  }

  createModelsForSelectedDate(selectedDate: string): MeterModel[] {
    const date = new Date(selectedDate);
    const models: MeterModel[] = [];
    
    // Tạo dữ liệu cho 7 ngày từ ngày được chọn
    const days = this.generateDaysFromSelectedDate(selectedDate);
    
    // Tạo dữ liệu cho từng model
    const modelNames = ['LSTM_minflow', 'LSTM_maxflow', 'Isolation_minflow', 'Isolation_maxflow', 'Kết luận'];
    
    modelNames.forEach(modelName => {
      const values: string[] = [];
      
      days.forEach((day, index) => {
        if (modelName === 'Kết luận') {
          values.push(this.getRandomConclusionValue(index));
        } else {
          values.push(this.getRandomModelValue(index));
        }
      });
      
      models.push({
        name: modelName,
        values: values
      });
    });
    
    return models;
  }

  getRandomModelValue(dayIndex: number): string {
    const values = ['Chưa có dữ liệu', 'Nghi ngờ thấp', 'Nghi ngờ cao'];
    if (dayIndex === 0) {
      return values[Math.floor(Math.random() * values.length)];
    } else {
      return values[Math.floor(Math.random() * values.length)];
    }
  }

  getRandomConclusionValue(dayIndex: number): string {
    const values = ['Chưa xác định', 'Nghi ngờ thấp', 'Nghi ngờ trung bình', 'Nghi ngờ cao'];
    if (dayIndex === 0) {
      return values[Math.floor(Math.random() * values.length)];
    } else {
      return values[Math.floor(Math.random() * values.length)];
    }
  }
}