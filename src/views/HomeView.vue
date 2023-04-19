<template>
  <div>
    <div v-for="c in selectedCase" :key="c.index">

      <!-- Part-1 / Introduction -->
      <p>The today's case is a {{ c.crimeType }} that happenned in {{ c.location }},</p>
      <p>{{ c.description }}</p>

      <!-- Part-1 / Suspect-->
      <p>Prosecutor: The defendant suspect is {{ c.suspect.name }} a {{ c.suspect.age }} years old
        {{ c.suspect.occupation }}</p>
      <p>Prosecutor: {{ c.suspect.description }}</p>
    </div>

    <!-- Part-2 / Discussions -->
    <p>Would you like to begin with the prosecution's opening statement or the defense's opening statement ?</p>
    <!-- Part-2 / Buttons to give the parole -->
    <div>
      <button @click="isGuilty(true)">Defense</button>
      <button @click="isGuilty(false)">Prosecution</button>
    </div>

    <!-- Last part / Decisions Buttons -->
    <div>
      <button @click="isGuilty(true)">Guilty</button>
      <button @click="isGuilty(false)">Not guilty</button>
    </div>

    <!-- Last part / Judgement -->
    <div>
      <p>{{ finalDecision }}</p>
      <button @click="refreshCase">New case</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      crimes:
          [
            {
              crimeType: "Embezzlement",
              location: "Boston",
              description: "A large sum of money went missing from a local bank.",
              suspect: {
                name: "Jennifer Lee",
                age: 41,
                occupation: "Bank Manager",
                description: "Jennifer had access to the money and has a history of financial troubles."
              }
            },
            {
              crimeType: "Forgery",
              location: "San Francisco",
              description: "Fake paintings were sold to art collectors as authentic.",
              suspect: {
                name: "Daniel Kim",
                age: 37,
                occupation: "Art Dealer",
                description: "Daniel sold the paintings and was found to have knowledge of their authenticity."
              }
            },
            {
              crimeType: "Kidnapping",
              location: "Miami",
              description: "A wealthy businessman's daughter was kidnapped for ransom.",
              suspect: {
                name: "Carlos Hernandez",
                age: 29,
                occupation: "Unknown",
                description: "Carlos was caught on camera near the scene and had a history of violent crimes."
              }
            },
            {
              crimeType: "Manslaughter",
              location: "Dallas",
              description: "A car accident resulted in the death of a pedestrian.",
              suspect: {
                name: "Samantha Williams",
                age: 24,
                occupation: "Nurse",
                description: "Samantha was driving under the influence of alcohol at the time of the accident."
              }
            },
            {
              crimeType: "Robbery",
              location: "Seattle",
              description: "A jewelry store was robbed at gunpoint.",
              suspect: {
                name: "Michael Davis",
                age: 35,
                occupation: "Truck Driver",
                description: "Michael was found in possession of stolen jewelry from the store."
              }
            },
            {
              crimeType: "Fraud",
              location: "Houston",
              description: "A company's financial records were falsified to cover up losses.",
              suspect: {
                name: "Olivia Nguyen",
                age: 42,
                occupation: "Accountant",
                description: "Olivia had access to the records and was found to have made suspicious transactions."
              }
            },
            {
              crimeType: "Stalking",
              location: "Atlanta",
              description: "A celebrity was followed and harassed by a fan.",
              suspect: {
                name: "Jeremy Thomas",
                age: 21,
                occupation: "Student",
                description: "Jeremy was caught on camera following the celebrity and had a history of similar behavior."
              }
            },
            {
              crimeType: "Trespassing",
              location: "Denver",
              description: "A man entered a private property without permission.",
              suspect: {
                name: "Matthew Green",
                age: 49,
                occupation: "Salesman",
                description: "Matthew claimed to be lost and entered the property by mistake."
              }
            },
            {
              crimeType: "Vandalism",
              location: "Phoenix",
              description: "A public statue was defaced with graffiti.",
              suspect: {
                name: "Emily Jones",
                age: 19,
                occupation: "College Student",
                description: "Emily was caught on camera spray painting the statue."
              }
            }],
      selectedCase: [],
      defenseSentences: [
        "Your honor, my client is innocent and the evidence will show that.",
        "The prosecution has not provided enough evidence to prove guilt beyond a reasonable doubt.",
        "There are alternative explanations for the evidence presented that do not point to my client's guilt.",
        "The prosecution's case is based on circumstantial evidence and speculation."
      ],

      prosecutionSentences: [
        "Your honor, the evidence clearly shows that the defendant is guilty.",
        "The defendant's actions and motives leave no doubt that they committed the crime.",
        "Eyewitness testimony and physical evidence prove that my case is correct.",
        "My case is based on solid evidence and reasoning, and the defense's arguments are baseless."
      ],

      defenseGreeting: "Good morning, your honor. May I have the first parole?",
      prosecutionGreeting: "Good morning, your honor. If it pleases the court, may I have the first parole?",
      finalDecision: ""
    }
  },
  created() {
    this.refreshCase()
  },
  methods: {
    isGuilty(judgement) {
      if (judgement) {
        this.finalDecision = `The suspect, ${this.selectedCase[0].suspect.name} is recognized guilty`;
      } else {
        this.finalDecision = `The suspect, ${this.selectedCase[0].suspect.name} is recognized not guilty`;
      }
    },
    refreshCase() {
      this.selectedCase = [];
      this.finalDecision = "";
      const randomIndex = Math.floor(Math.random() * this.crimes.length);
      const randomCase = this.crimes[randomIndex];

      this.selectedCase.push(randomCase);

      console.log(randomCase);
    }
  }
}
</script>
