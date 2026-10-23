
let score = Number(prompt("Enter your test score (0-100):"));
let grade;
if (score < 0 || score > 100 || Number.isNaN(score)) {
    console.log("Invalid score! Please enter a number between 0 and 100.");
} else {
    if (score >= 90) {
        grade = "A";
    } else if (score >= 80) {
        grade = "B";
    } else if (score >= 70) {
        grade = "C";
    } else if (score >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }
    switch (grade) {
        case "A":
            console.log("Grade: A ");
            break;
        case "B":
            console.log("Grade: B ");
            break;
        case "C":
            console.log("Grade: C ");
            break;
        case "D":
            console.log("Grade: D ");
            break;
        case "F":
            console.log("Grade: F ");
            break;
    }
    let result = score >= 40 ? "Passed" : "Failed";

    console.log("Test Score:", score);
    console.log("Result:", result);
}
