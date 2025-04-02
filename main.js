// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function calculatePercentage(num1, num2) {
  return Math.floor((num1 / num2) * 100)

}

function pAequorFactory(num, dnaBases) {
  return {
    _specimenNum: num,
    _dna: dnaBases,
    mutate() {

      const randomIndex = Math.floor(Math.random() * this._dna.length);
      let newDnaBase = returnRandBase();

      while(newDnaBase === this._dna[randomIndex]) {
        newDnaBase = returnRandBase();
      }

      this._dna[randomIndex] = newDnaBase;
      return this._dna;
    },
    compareDNA(pAequor) {
      let dnaMatches = 0;

      for (let i = 0; i < pAequor._dna.length; i++) {
        if (this._dna[i] === pAequor._dna[i]) {
          dnaMatches += 1;
        }
      }

      const percentage = calculatePercentage(dnaMatches, pAequor._dna.length);
      console.log(`specimen ${this._specimenNum} and specimen ${pAequor._specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive() {
      let sFactor = 0;
      this._dna.forEach(dnaBase => {
        if (dnaBase === 'G' || dnaBase === 'C') sFactor += 1;
      });

      const percentage = calculatePercentage(sFactor, this._dna.length);
      return percentage >= 60;
    }
  }
}
const pAequorSamples = [];
for (let i = 0; i < 30; i++) {

  const pAequorSample = pAequorFactory(i + 1, mockUpStrand());
  while (!pAequorSample.willLikelySurvive()) {
    pAequorSample.mutate();
  }

  pAequorSamples.push(pAequorSample);
}