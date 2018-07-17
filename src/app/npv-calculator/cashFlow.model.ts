export interface NPVData {
    initialInvestment: number;
    discountRateIncrement: number;
    upperBound: number;
    lowerBound: number;
    cashFlows: Array<CashFlow>;
}

export interface CashFlow {
    value: number;
    label: string;
}

export interface NPVDataRequest {
    initialInvestment: number;
    discountRateIncrement: number;
    upperBound: number;
    lowerBound: number;
    cashFlows: Array<number>;
    isChecked: boolean;
}

export interface NPVRequest {
    initialInvestment: number;
    discountRateIncrement: number;
    cashFlows: Array<number>;
}

