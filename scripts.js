const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionScreen = document.getElementById('question-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultDriver = document.getElementById('result-driver');
const driverDesc = document.getElementById('driver-description')

let currentQuestion = 0;
let scores = {};

const drivers = {
  "Max Verstappen": 0,
  "Liam Lawson": 0,
  "Charles Leclerc": 0,
  "Lewis Hamilton": 0,
  "Lando Norris": 0,
  "Oscar Piastri": 0,
  "George Russell": 0,
  "Andrea Kimi Antonelli": 0,
  "Fernando Alonso": 0,
  "Lance Stroll": 0,
  "Pierre Gasly": 0,
  "Jack Doohan": 0,
  "Alexander Albon": 0,
  "Carlos Sainz Jr.": 0,
  "Esteban Ocon": 0,
  "Oliver Bearman": 0,
  "Yuki Tsunoda": 0,
  "Isack Hadjar": 0,
  "Nico Hülkenberg": 0,
  "Gabriel Bortoleto": 0
};

const driverPersonality = {
  "Max Verstappen": "You’re the kind of person who doesn’t care about drama or attention—you just want to be the best at what you do. You have a laser-focused mentality, and once you lock onto a goal, nothing can distract you. Whether you're crushing your job, leading a team project, or mastering a hobby, you do it with intensity. Some people might say you're a bit too blunt or even intimidating, but that’s only because you don’t sugarcoat things. You believe results speak louder than words, and deep down, you’re loyal and protective of those close to you—once they’ve earned your trust.",

  "Liam Lawson": "You’re quietly competitive and incredibly adaptable. You don’t make a lot of noise, but you’re always ready to jump into any situation and prove your worth. You might be the underdog in the room, but that just fuels your drive. People often underestimate you, which is fine—you like letting your results do the talking. You're flexible, easy to get along with, and never shy away from a challenge, even if it means learning on the fly. You’re the friend who always shows up and handles pressure like it’s no big deal.",
  
  "Charles Leclerc": "You're passionate, charming, and a bit of a perfectionist. People are drawn to your presence—you’ve got this mix of elegance and intensity that makes everything you do feel important. You take pride in your work and always strive to do things right, even when the odds are stacked against you. Emotion runs deep in everything you do, and while that sometimes leads to frustration, it also makes your wins that much sweeter. You carry your past like a storybook—full of motivation and meaning—and you never stop believing in your potential.",
  
  "Lewis Hamilton": "You’re a leader with a deep sense of purpose. Whether it’s standing up for others or reinventing yourself creatively, you never stop evolving. You’re stylish, thoughtful, and full of charisma, but you’re also incredibly driven and goal-oriented. You believe in making the world better, whether through your work, your voice, or your actions. You balance ambition with compassion, and people respect your ability to stand tall in the spotlight without losing your authenticity. You’re the type who turns setbacks into comebacks and always moves with intention.",
  
  "Lando Norris": "You’re the life of the party and the class clown—but don’t let that fool anyone. Beneath the jokes and memes is someone clever, thoughtful, and fiercely competitive. You don’t like to take life too seriously, but when it comes down to something you care about, you go all in. You're easy to like, fun to be around, and surprisingly introspective when you're one-on-one. People might first notice your humor, but they stay because of your kindness and quiet determination.",
  
  "Oscar Piastri": "You’re the chill genius. You don’t need to say much to make an impact—your calm, collected nature and sharp mind speak for themselves. You might not be the loudest person in the room, but you're usually the smartest. You think things through carefully, and once you commit, you're almost surgical in your execution. People trust you because you're consistent, level-headed, and don’t get rattled under pressure. You’re not flashy, but you’re someone others admire for your intellect, subtle humor, and surprising depth.",
  
  "George Russell": "You're polished, professional, and ambitious. You like having structure and a clear path to success—and you’re more than willing to put in the work. You’re the planner in your friend group, always organized and reliable, and maybe a bit of a perfectionist. You value appearances and often come across as mature beyond your years. But beneath the crisp exterior is someone who genuinely cares, wants to win fairly, and knows how to take the lead without being arrogant.",
  
  "Andrea Kimi Antonelli": "You’re the prodigy—young, talented, and already thinking five steps ahead. You have an old soul vibe even if you’re the youngest in the room. You soak up knowledge like a sponge and have a quiet confidence that says, “I know I belong here.” You might still be finding your place in the world, but there’s no doubt you’re going to make waves. People admire your potential, but what really sets you apart is your poise under pressure and your hunger to prove yourself through action, not words.",
  
  "Fernando Alonso": "You’re the strategist, the survivor, the wise veteran in any situation. You’ve been through ups and downs, and that’s only made you sharper. You’re bold, stubborn, and always thinking two moves ahead. People respect your tenacity—even when they don’t always agree with your methods. You’ve got a rebellious streak, but it’s paired with experience and calculation. You’re not here for approval—you’re here to win, and you’ll outsmart anyone who underestimates you.",
  
  "Lance Stroll": "You’re the quiet achiever who doesn’t always get credit but keeps showing up anyway. Some might say you’ve had help along the way, but you know you've worked hard to prove yourself. You’re calm, grounded, and avoid the spotlight, but that doesn’t mean you don’t care. You move at your own pace and don’t feel the need to win everyone over. You’ve got a solid sense of self, and you’re more comfortable doing your thing rather than playing into others’ expectations.",
  
  "Pierre Gasly": "You’ve got fire in your heart and a chip on your shoulder. You’re resilient, emotionally driven, and have had to rebuild yourself more than once. You love hard, fight hard, and wear your emotions on your sleeve. You’re the kind of person who thrives when people count you out—because that’s when your true strength shows. Loyalty is everything to you, and when someone betrays that, you don’t forget. You’re the comeback kid with something to prove and a lot of heart to show.",
  
  "Jack Doohan": "You’re focused, determined, and deeply aware of the legacy you're building. Whether or not you're following in someone else’s footsteps, you take pride in doing things your own way. You're quietly ambitious and don’t need validation to know you’re on the right path. You’re respectful, hardworking, and not afraid to take risks to chase your dreams. People admire your balance of humility and hunger—you know your worth and aren’t afraid to go after more.",
  
  "Alexander Albon": "You’re the gentle soul with a fighter’s heart. You’re thoughtful, soft-spoken, and always trying to do the right thing, even when the world makes it hard. You’ve faced a lot of pressure, but you carry it with grace. You have a quiet strength that people often overlook until they really get to know you. You’re loyal, kind, and never let setbacks define you. You’re not here for the spotlight—you just want to do your best and make people proud.",
  
  "Carlos Sainz Jr.": "You’re the ultimate team player—smart, strategic, and dependable. You’re not afraid to speak your mind, but you also know when to keep your head down and get the job done. You’ve got a practical streak, but that doesn’t mean you’re boring—far from it. You’re witty, charming, and quietly confident. People trust you because you’re steady and professional, but you’ve also got a subtle fire that keeps you pushing for more. You’re the kind of friend who always has your back.",
  
  "Esteban Ocon": "You’re tough, relentless, and never take your foot off the gas. You’ve worked hard for everything you have, and you don’t let anyone forget that. You’re ambitious and not afraid of a little conflict if it means standing your ground. You’ve got a scrappy edge to you, but underneath is someone deeply driven by pride, loyalty, and the desire to be the best version of yourself. You’re not here to make everyone happy—you’re here to succeed.",
  
  "Oliver Bearman": "You’re young, talented, and full of energy. You approach life with optimism and confidence, and people are starting to notice your potential. You're brave, maybe even a little reckless at times, but you learn fast and bounce back even faster. You’ve got that “main character” energy—the kind of person who’s just getting started but already feels like a big deal. People gravitate toward your charisma and boldness, and you're only just getting warmed up.",
  
  "Yuki Tsunoda": "You’re spirited, hilarious, and wear your heart on your sleeve. You’re not afraid to speak your mind, and that makes you incredibly relatable. You’ve got a fiery side, but it’s matched by your sincerity and raw passion. People never have to guess how you're feeling—you’re refreshingly honest and authentic. You’ve faced your share of challenges, but you meet them with humor and heart. You’re a small package of big energy, and everyone loves having you around.",
  
  "Isack Hadjar": "You’re a rising star who isn’t afraid to push limits. You’ve got a quiet swagger about you—a sense of cool confidence that doesn’t need to be loud. You’re a thinker and a doer, someone who prefers to let your actions speak. You’ve got raw talent and aren’t afraid to put in the work, but you also know when to relax and enjoy the ride. You’re focused but not uptight, competitive but not cutthroat. Basically, you’re someone to watch.",
  
  "Nico Hülkenberg": "You’re reliable, experienced, and always just one opportunity away from showing your full potential. You’ve been through a lot, but you never lose your cool. People count on you because you're consistent, clever, and always ready when duty calls. You’ve got a dry sense of humor and a quiet resilience that makes you stand out. You might not always be center stage, but when the time comes, you’re ready to steal the show.",
  
  "Gabriel Bortoleto": "You’re up-and-coming, full of excitement, and eager to make your mark. You’re the person who’s always learning, always asking questions, and always hustling. You might not have everything figured out yet, but you’ve got the drive, and that’s what matters most. You’re enthusiastic, curious, and willing to work for what you want. People root for you because they see how much heart you put into everything. You’re still writing your story—and everyone wants to see where it goes."
};


const questions = [
  {
    question: "What's your racing style?",
    answers: [
      { text: "Aggressive and fearless", driver: "Isack Hadjar" },
      { text: "Calm and calculated", driver: "Oscar Piastri" },
      { text: "Flashy and fast", driver: "Charles Leclerc" },
      { text: "Smart and strategic", driver: "Lewis Hamilton" }
    ]
  },
  {
    question: "Pick a vibe:",
    answers: [
      { text: "Cool under pressure", driver: "Fernando Alonso" },
      { text: "Playful and fun", driver: "Lando Norris" },
      { text: "Quiet confidence", driver: "Andrea Kimi Antonelli" },
      { text: "Energetic and bold", driver: "Yuki Tsunoda" }
    ]
  },
  {
    question: "What motivates you the most?",
    answers: [
      { text: "Proving people wrong", driver: "Liam Lawson" },
      { text: "Chasing greatness", driver: "Carlos Sainz Jr." },
      { text: "Breaking boundaries", driver: "Esteban Ocon" },
      { text: "Legacy and pride", driver: "Charles Leclerc" }
    ]
  },
  {
    question: "Choose a track to dominate:",
    answers: [
      { text: "Monaco – precision is everything", driver: "George Russell" },
      { text: "Spa – pure speed and skill", driver: "Max Verstappen" },
      { text: "Suzuka – technical brilliance", driver: "Yuki Tsunoda" },
      { text: "Silverstone – the heart of racing", driver: "Lando Norris" }
    ]
  },
  {
    question: "How do you handle pressure?",
    answers: [
      { text: "I thrive in it", driver: "Liam Lawson" },
      { text: "I analyze and adapt", driver: "Oscar Piastri" },
      { text: "I stay chill and go with the flow", driver: "Alexander Albon" },
      { text: "I use it to fuel me", driver: "Carlos Sainz Jr." }
    ]
  },
  {
    question: "What’s your ideal teammate like?",
    answers: [
      { text: "Someone who pushes me to the limit", driver: "Fernando Alonso" },
      { text: "Someone I can joke with off-track", driver: "Lando Norris" },
      { text: "Someone with raw talent", driver: "Andrea Kimi Antonelli" },
      { text: "Someone with heart", driver: "Jack Doohan" }
    ]
  },
  {
    question: "Pick a color that describes your personality:",
    answers: [
      { text: "Red – passion and power", driver: "Charles Leclerc" },
      { text: "Blue – calm and intelligent", driver: "George Russell" },
      { text: "Green – focused and grounded", driver: "Esteban Ocon" },
      { text: "Orange – creative and energetic", driver: "Isack Hadjar" }
    ]
  },
  {
    question: "What's your pre-race mindset?",
    answers: [
      { text: "Laser-focused", driver: "Oscar Piastri" },
      { text: "Hyped and ready", driver: "Yuki Tsunoda" },
      { text: "Calm and centered", driver: "Andrea Kimi Antonelli" },
      { text: "Confident and cool", driver: "Carlos Sainz Jr." }
    ]
  },
  {
    question: "Choose a career path (if not F1):",
    answers: [
      { text: "Engineer or strategist", driver: "George Russell" },
      { text: "Pilot or adventurer", driver: "Fernando Alonso" },
      { text: "Comedian or streamer", driver: "Alexander Albon" },
      { text: "Motivational speaker", driver: "Lewis Hamilton" }
    ]
  },
  {
    question: "How do you win a race?",
    answers: [
      { text: "Outdrive everyone from start to finish", driver: "Pierre Gasly" },
      { text: "Play the long game", driver: "Lewis Hamilton" },
      { text: "Strike when others least expect it", driver: "Liam Lawson" },
      { text: "Seize every single opportunity", driver: "Jack Doohan" }
    ]
  },
  {
    question: "What kind of leader are you?",
    answers: [
      { text: "Lead by example", driver: "Charles Leclerc" },
      { text: "Calm and composed", driver: "Oscar Piastri" },
      { text: "Loud and motivating", driver: "Yuki Tsunoda" },
      { text: "Strategic and wise", driver: "Lewis Hamilton" }
    ]
  },
  {
    question: "Choose a racing idol:",
    answers: [
      { text: "Ayrton Senna", driver: "Lewis Hamilton" },
      { text: "Michael Schumacher", driver: "Sebastian Vettel" },
      { text: "Alain Prost", driver: "George Russell" },
      { text: "Kimi Räikkönen", driver: "Lando Norris" }
    ]
  },
  {
    question: "What’s your greatest strength?",
    answers: [
      { text: "Adaptability", driver: "Jack Doohan" },
      { text: "Consistency", driver: "Esteban Ocon" },
      { text: "Raw speed", driver: "Max Verstappen" },
      { text: "Creativity", driver: "Gabriel Bortoleto" }
    ]
  },
  {
    question: "Describe your weekend vibe:",
    answers: [
      { text: "Work hard, rest later", driver: "Nico Hülkenberg" },
      { text: "Adventure and exploration", driver: "Fernando Alonso" },
      { text: "Gaming and chill", driver: "Lando Norris" },
      { text: "Training and discipline", driver: "Andrea Kimi Antonelli" }
    ]
  },
  {
    question: "If you crash out, how do you react?",
    answers: [
      { text: "Rage and frustration", driver: "Pierre Gasly" },
      { text: "Silent reflection", driver: "Oscar Piastri" },
      { text: "Shrug it off, learn, and move on", driver: "Alexander Albon" },
      { text: "Fuel for a comeback", driver: "Carlos Sainz Jr." }
    ]
  },
  {
    question: "How do you celebrate a win?",
    answers: [
      { text: "Explosive joy", driver: "Yuki Tsunoda" },
      { text: "A quiet nod of satisfaction", driver: "Oscar Piastri" },
      { text: "A massive party", driver: "Lando Norris" },
      { text: "Dedicate it to someone important", driver: "Lewis Hamilton" }
    ]
  },
  {
    question: "Pick a motto:",
    answers: [
      { text: "Whatever it takes", driver: "Max Verstappen" },
      { text: "Work smarter, not harder", driver: "George Russell" },
      { text: "Live fast, have fun", driver: "Gabriel Bortoleto" },
      { text: "Never back down", driver: "Jack Doohan" }
    ]
  },
  {
    question: "What’s your dream team trait?",
    answers: [
      { text: "Technical excellence", driver: "Oscar Piastri" },
      { text: "Driver-focused culture", driver: "Lewis Hamilton" },
      { text: "Winning history", driver: "Charles Leclerc" },
      { text: "Underdog grit", driver: "Jack Doohan" }
    ]
  },
  {
    question: "Which quality annoys you most in rivals?",
    answers: [
      { text: "Arrogance", driver: "Esteban Ocon" },
      { text: "Lack of focus", driver: "George Russell" },
      { text: "Overconfidence", driver: "Charles Leclerc" },
      { text: "Excuses", driver: "Max Verstappen" }
    ]
  },
  {
    question: "What makes you a future world champion?",
    answers: [
      { text: "Unmatched speed", driver: "Isack Hadjar" },
      { text: "Iron discipline", driver: "Andrea Kimi Antonelli" },
      { text: "Relentless passion", driver: "Jack Doohan" },
      { text: "Fearless mentality", driver: "Liam Lawson" }
    ]
  },
  // NEW QUESTIONS
  {
    question: "How do you recover from setbacks?",
    answers: [
      { text: "Turn pain into motivation", driver: "Gabriel Bortoleto" },
      { text: "Strategize your comeback", driver: "Esteban Ocon" },
      { text: "Forget and reset", driver: "Alexander Albon" },
      { text: "Get back stronger", driver: "Pierre Gasly" }
    ]
  },
  {
    question: "What’s your approach to improvement?",
    answers: [
      { text: "Constant analysis", driver: "Oscar Piastri" },
      { text: "Push boundaries every time", driver: "Isack Hadjar" },
      { text: "Work hard in silence", driver: "Nico Hülkenberg" },
      { text: "Learn from the best", driver: "Sebastian Vettel" }
    ]
  },
  {
    question: "What defines your racing legacy?",
    answers: [
      { text: "Inspiring the next generation", driver: "Lewis Hamilton" },
      { text: "Never giving up", driver: "Jack Doohan" },
      { text: "Pure racing spirit", driver: "Carlos Sainz Jr." },
      { text: "Staying true to yourself", driver: "Andrea Kimi Antonelli" }
    ]
  },
  {
    question: "What's your approach to rivalries?",
    answers: [
      { text: "Use them to fuel progress", driver: "Max Verstappen" },
      { text: "Prove yourself every weekend", driver: "Liam Lawson" },
      { text: "Let results speak", driver: "Oscar Piastri" },
      { text: "Respect on track, fire within", driver: "Yuki Tsunoda" }
    ]
  },
  {
    question: "How would your fans describe you?",
    answers: [
      { text: "Relatable and fun", driver: "Lando Norris" },
      { text: "Mysterious and fast", driver: "Sebastian Vettel" },
      { text: "Focused and consistent", driver: "George Russell" },
      { text: "Explosive and fearless", driver: "Isack Hadjar" }
    ]
  }
];


startBtn.onclick = () => {
  startScreen.classList.remove('active');
  questionScreen.classList.add('active');
  startQuiz();
}

function startQuiz() {
  let scores = {};
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  answerButtons.innerHTML = '';

  q.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.onclick = () => {
      scores[answer.driver] = (scores[answer.driver]||0)+1;
      currentQuestion++;
      if (currentQuestion < questions.length){
        showQuestion();
      }
      else{
        finishQuiz();
      }
    }
    answerButtons.appendChild(button);
  });
}

function finishQuiz() {
  questionScreen.classList.remove('active');
  resultScreen.classList.add('active');

  const topDriver = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  resultDriver.textContent = topDriver;
  driverDesc.textContent = driverPersonality[topDriver];
}

restartBtn.onclick = () => {
  startScreen.classList.remove('active');
  resultScreen.classList.remove('active')
  questionScreen.classList.add('active');
  startQuiz();
}