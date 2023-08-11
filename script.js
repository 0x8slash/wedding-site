document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "اكتب حاجه حلوه انا و انت عرفنا بعض بيها و نعرف بعض من قد ايه",
    "اتمنى حاجه حلوه لمهند",
    "اتمنى حاجه حلوه لسما",
    "اقترح لينا مكان نسافر فيه",
    "اقترح اكله حلوه  تحب تاكلها لما تيجى تزورنا",
    "كل الكلام الجميل دا طالع من شخص جميل ☺️ هنخمن انت مين بس اكتب اسمك بقى عشان نعرف احنا خمّنا صح و لا لا",
  ];
  let currentQuestionIndex = 0;

  const form = document.getElementById("wedding-form");
  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-btn");
  // ADDED ARRAY TO STORE ANSWERS
  answerArr = [];
  // Initialize the form with the first question
  renderQuestion();

  // Function to render the current question
  function renderQuestion() {
    questionContainer.textContent = questions[currentQuestionIndex];
    questionContainer.style =
      "font-size: 20px; padding-left: 150px; padding-right: 150px;";
    const input = document.createElement("input");
    input.type = "text";
    input.name = `Q${currentQuestionIndex + 1}`;
    input.required = true;
    input.style = "font-size: 15px; height: 100px; width: 500px";
    input.id = "name-input";
    questionContainer.appendChild(input);
  }

  // Event listener for the next button
  nextButton.addEventListener("click", function () {
    if (form.checkValidity()) {
      // APPEND ANSWER TO ANSWERS ARRAY
      answerArr.push(document.getElementById("name-input").value);
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        submitForm();
      }
    } else {
      form.reportValidity();
    }
  });

  // Function to submit the form
  // Function to submit the form
  function submitForm() {
    const answers = {};
    for (let i = 0; i < questions.length; i++) {
      const questionKey = `Q${i + 1}`;
      answers[questionKey] = answerArr[i]; // Use the answer from answerArr
    }
    console.log(answers);
    // Send the answers to the API using fetch
    const apiUrl = "http://localhost:3000/api/post"; // Replace with your API endpoint
    nextButton.style.visibility = "hidden";
    questionContainer.textContent = "نورتنا و فرحتنا اكتملت بوجودك"; // say thanks for submitting as well
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response
          console.log("Answers submitted successfully!");
        } else {
          // Handle error response
          console.error("Failed to submit answers");
          console.log(JSON.stringify(answers));
        }
      })
      .catch((error) => {
        console.error("An error occurred while submitting answers:", error);
      });
  }
});
