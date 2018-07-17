import { Component, OnInit } from '@angular/core';
import { CashFlow, NPVData, NPVDataRequest, NPVRequest } from 'src/app/npv-calculator/cashFlow.model';
import { ChartOption, Chart } from 'src/app/_shared/models/chart.model';
import { NpvService } from 'src/app/npv-calculator/npv-calculator.service';

@Component({
  selector: 'app-npv-calculator',
  templateUrl: './npv-calculator.component.html',
  styleUrls: ['./npv-calculator.component.scss']
})
export class NpvCalculatorComponent implements OnInit {
  isChecked: boolean = false;
  npvDataRequest: NPVDataRequest;
  npvData: NPVData;
  value: number;
  cashFlows: Array<CashFlow> = [];
  data: Chart;
  options: ChartOption;
  chartType: string;
  constructor(private service: NpvService) { }

  ngOnInit() {
    this.npvData = {
      cashFlows: [{
        label: 'Cash Flow',
        value: 0,
      },
      {
        label: 'Cash Flow',
        value: 0,
      }],
      discountRateIncrement: 0,
      initialInvestment: 0,
      lowerBound: 0,
      upperBound: 0
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  addCashFlow() {
    const cashFlow = {
      label: 'Cash Flow',
      value: 0,
    };
    if (this.npvData.cashFlows.length < 6) {
      this.npvData.cashFlows.push(cashFlow);
    }
  }

  calculate() {
    const cashFlows: Array<number> = [];
    this.npvData.cashFlows.forEach((x) => {
      cashFlows.push(x.value);
    });
    const request: NPVDataRequest = {
      cashFlows: cashFlows,
      discountRateIncrement: this.npvData.discountRateIncrement,
      initialInvestment: this.npvData.initialInvestment,
      lowerBound: this.npvData.lowerBound,
      upperBound: this.npvData.upperBound,
      isChecked: this.isChecked
    };
    if (this.isChecked) {
      this.service.getChartData(request).subscribe(response => {
        this.displayGraph(response.labels, response.data);
      });
    } else {
      const npvRequest: NPVRequest = {
        cashFlows: cashFlows,
        discountRateIncrement: this.npvData.discountRateIncrement,
        initialInvestment: this.npvData.initialInvestment,
      };
      this.service.getNpv(request).subscribe(response => {
        this.value = response;
      });
    }
  }

  removeCashFlow(index: CashFlow) {
    const item = this.npvData.cashFlows.indexOf(index);
    this.npvData.cashFlows.splice(item, 1);
  }

  reset(): void {
    this.npvData = {
      cashFlows: [{
        label: 'Cash Flow',
        value: 0,
      },
      {
        label: 'Cash Flow',
        value: 0,
      }],
      discountRateIncrement: 0,
      initialInvestment: 0,
      lowerBound: 0,
      upperBound: 0
    };

    this.isChecked = false;
    this.value = null;
  }

  setBound() {
    this.isChecked = !this.isChecked;
  }

  private displayGraph(npvLabelList: string[], npvList: number[]): void {
    this.data = {
      labels: npvLabelList,
      datasets: [
        {
          label: 'Net Present Value',
          data: npvList,
          fill: false,
          borderColor: '#0275d8',
          borderWidth: 1
        },
      ]
    };
  }
}
