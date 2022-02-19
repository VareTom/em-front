export class Statistic {
  totalExpendituresInCent: number;
  totalIncomes: number;
  actualIncomes: number;
  benefits: number;
  
  constructor(json: any) {
    this.totalExpendituresInCent = json.totalExpendituresInCent;
    this.totalIncomes = json.totalIncomes;
    this.actualIncomes = json.actualIncomes;
    this.benefits = json.benefits;
  }
}