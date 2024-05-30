import { randomBytes } from 'crypto';


export class SortingData {
	static list = () => {
		return SortingData.generateRandomNumbers(100);
	}

	static generateRandomNumbers = (count: number, min = 0, max = 100) => { // function to generate random numbers
		const randomNumbers: number[] = [];
		for (let i = 0; i < count; i++) {
			const randomBuffer = randomBytes(4);
			const randomValue = randomBuffer.readUInt32BE(0);
			const scaledValue = min + (randomValue / 0xFFFFFFFF) * (max - min);
			
			randomNumbers.push(Math.floor(scaledValue));
		}
		
		return randomNumbers;
	}
}