type InvestmentData = {
    initialAmount: number,
    annualContribution: number,
    expectedReturn: number,
    duration: number
};

type InvestmentResult = {
    year: string,
    totalAmount: number,
    totalInterestEarned: number,
    totalContributions: number
};

type CalculationLimit = InvestmentResult[] | string;

function calculateInvestment(data: InvestmentData): CalculationLimit {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;

    if (initialAmount < 0) {
        return 'Initail investment amount should atlest be zero';
    }

    if (duration <= 0) {
        return 'No valid amount of years provided';
    }

    if (expectedReturn < 0) {
        return 'Expected return must atlest be zero';
    }

    let total = initialAmount;
    let totalContributions = 0;
    let totalInterestEarned = 0;

    const annualResults: InvestmentResult[] = [];

    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn);
        totalInterestEarned = total - totalContributions - initialAmount;
        totalContributions = totalContributions + annualContribution;
        total = total + annualContribution;

        annualResults.push({
            year: `Year ${i + 1}`,
            totalAmount: total,
            totalInterestEarned,
            totalContributions
        });
    }

    return annualResults;
}
// this function to print results

function PrintResults(results: CalculationLimit) {
    if (typeof results === 'string') {
        console.log(results);
        return;
    }

    for (const yearEndResult of results) {
        console.log(yearEndResult.year);
        console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
    }
}

const investmentData: InvestmentData =
{
    initialAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.80,
    duration: 10
}

const results = calculateInvestment(investmentData);

PrintResults(results);