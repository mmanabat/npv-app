export interface Chart {
    labels: Array<string>;
    datasets: Array<ChartData>;
}

export interface ChartData {
    label: string;
    data: Array<number>;
    fill: boolean;
    borderColor: string;
    borderWidth: number;
}

export interface ChartOption {
    responsive: boolean;
    maintainAspectRatio: boolean;
}
