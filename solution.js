const parser = require("simple-excel-to-json");
const json2xls = require("json2xls");
const fs = require("fs");

const document = parser.parseXls2Json("./Assignment.xlsx")[0];

//Create an object that will initialize the number of seats along with the subject name
const seats = {
  "Fundamentals of Web Technologies": 50,
  "Enterprise Resource Planning": 50,
  "User Interface/User Experience (UI/UX) Design": 50,
  "Internet, Technology and Society": 50,
};

//Arrays come with a sort function in Javascript
//We can use the sort function to sort the array
//Using it like this will sort the array in a descending order
const sortedDocument = document.sort((a, b) => b.CGPA - a.CGPA);

//On every iteration of the map fucntion on the sorted array we are checking
//if the first option still has seats available to it, else we move to the next option and so on.
//Eg. Lets assume the student object had options look like this for
//the first iteration of map on sortedDocument.
//OPTION_1: 'User Interface/User Experience (UI/UX) Design',
//OPTION_2: 'Fundamentals of Web Technologies',
//OPTION_3: 'Internet, Technology and Society',
//OPTION_4: 'Enterprise Resource Planning',
//Now in our map fuction that we are using on the sorted array,
//the student will be the object on every iteration
//Now the code that you see, seats[student.OPTION_1],
//Your computer will look at it like this, seats['User Interface/User Experience (UI/UX) Design']
//and it will say for the first loop you have 50 seats available so that student will get assigned their
//first option. While the code seats[student.OPTION_1]-- will reduce the seats by one from
//seats['User Interface/User Experience (UI/UX) Design'], so on the next iteration, the new student will only
//have 49 seats of User Interface/User Experience (UI/UX) Design and it will keep going on like that.
const electiveAllotment = sortedDocument.map((student) => {
  //Adding a new property to the student object to keep track of the seats available for each subject
  student.OPTION_1_SEATS = `${student.OPTION_1}(${seats[student.OPTION_1]})`;
  student.OPTION_2_SEATS = `${student.OPTION_2}(${seats[student.OPTION_2]})`;
  student.OPTION_3_SEATS = `${student.OPTION_3}(${seats[student.OPTION_3]})`;
  student.OPTION_4_SEATS = `${student.OPTION_4}(${seats[student.OPTION_4]})`;

  if (seats[student.OPTION_1] > 0) {
    student.ELECTIVE = student.OPTION_1;
    seats[student.OPTION_1]--;
  } else if (seats[student.OPTION_2] > 0) {
    student.ELECTIVE = student.OPTION_2;
    seats[student.OPTION_2]--;
  } else if (seats[student.OPTION_3] > 0) {
    student.ELECTIVE = student.OPTION_3;
    seats[student.OPTION_3]--;
  } else if (seats[student.OPTION_4] > 0) {
    student.ELECTIVE = student.OPTION_4;
    seats[student.OPTION_4]--;
  }
  return student;
});

// console.log(document)
//Converting from a data structre that javascript can understand to a datastructure that excel understands.
const electiveAllotmentExcelData = json2xls(
  electiveAllotment.map((student) => {
    //Returning a new student object whose options value will be the subject name along with the seats available
    return {
      REGNO: student.REGNO,
      NAME: student.NAME,
      CGPA: student.CGPA,
      OPTION_1: student.OPTION_1_SEATS,
      OPTION_2: student.OPTION_2_SEATS,
      OPTION_3: student.OPTION_3_SEATS,
      OPTION_4: student.OPTION_4_SEATS,
      ELECTIVE: student.ELECTIVE,
    };
  })
);
//Writing to a file called EllectiveAllotment.xlsx and providing electiveAllotmentExcelData to it as data in a binary format
fs.writeFileSync(
  "ElectiveAllotment.xlsx",
  electiveAllotmentExcelData,
  "binary"
);

/* 
    Slow down. Give yourself the time you need.
    Coding is easy, when you figure it out.
    Its just a bunch of rules that you have to figure out along with all the various patterns that exists 
    within that language.
    We as humans are the best pattern recognisers. We deal with patterns and rules everyday.
    When we are dealing with another human, we are constantly trying to figure out the rules that they 
    work within and we negotiate the rules that the both of us can conclusively agree is beneficial to us
    and we do all of that without ever actually consciously setting up the rules. We do it automatically
    because we do that everyday. If we don't like the rules that somebody has, we tend to move away from that 
    person. Every person will subject themselves to their own rules first and everything else is secondary,
    a means of fitting in. So if your rule is to give up easily, you will do that. If your rule is that 
    everything can be made easy, you will also do that. So we need to figure out what rules will you be 
    willing to accept as an individual.
  
    Now coding is simple, because unlike a human being, a computer thinks in binary. A computer
    cannot conceive multiple scenarios at once, it only moves from one state to the other. The advantage
    it has over a human is it can do that very, very quickly. So we as humans can use that to our advantage,
    use a computer as a tool to solve boring, repetitive things or you can infinitely scroll through your 
    social media feeds.
    Programming can be made easy.
    The only thing that you have to understand, is... 
    WTF is the value of the varaible that you are using.
    If you can understand what value it holds, you will be able to do something 
    with that value.
    Programming is just that, doing something with a value i.e your data and telling the computer
    what you want it to do with that data. So don't overcomplicate things by only staring
    at various variable name without understanding what the value of that variable is.
    Always try to figure out the value of something, in life or in code.
    There is nothing to scary about programming. You learn a programming language so that 
    you can speak with the computer, so you'll have to understand the rules of a language.
    You can understand these sentences because you know the rules of the english language.
    A programming language is similar in that regards that you can communicate with the computer
    if you understand the rules of the language that you are using.
    But unlike a human who can have mulitple interpretations of the same sentence, a computer will only
    understand it one way (most of the times). So you want to be precise about what you tell your computer
    to do when you are programming. A computer is rarely at fault if it doesn't do what you tell it do. 
    Most of the times you will have written something vague because you are still trying to figure out all
    the rules that you need to get your code working. Don't worry, it takes time. Time is something you will
    have to invest into anything in life if you want to make that thing work. So give it time, relax, breathe in
    and start over. That's another great thing about programming, you can always start over, we can't say the same
    about life. So if you'd like to change your personal rule from "It's too difficult!!!", to, "I can make it better and I
    can make it easy" you are on the right path. 
    Things are never as complicated as they seem, simplify it.
    And don't give up. You'll get there, in time.
*/