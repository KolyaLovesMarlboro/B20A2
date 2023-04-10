 //helper function for the change order of the TOP 5 books (Admin use case)
 function updateBookOrder() {
  const storedOrder = JSON.parse(localStorage.getItem("bookOrder") || "[]");
  const homeListBooks = document.getElementById("home-list-books");

  if (storedOrder.length === 0 || !homeListBooks) {
    return;
  }

  const books = Array.from(homeListBooks.children);
  const orderedBooks = [];

  storedOrder.forEach((bookId) => {
    const book = books.find((book) => book.id === `book-${bookId}`);
    if (book) {
      orderedBooks.push(book);
    }
  });
  homeListBooks.innerHTML = "";
  orderedBooks.forEach((book) => homeListBooks.appendChild(book));
}
 
 
 
 
 document.addEventListener("DOMContentLoaded", () => {


    // LEAVE REVIEW USE CASE


    const submitReviewButton = document.querySelector("#submit-review-button");
    const reviewList = document.querySelector("#review-list");

    // Helper function that accepts value returned from #review-book, uses it as key and returns full title of the book.

    const getBookTitle = (value) => {
      const books = {
        TTT: "Tomorrow, and Tomorrow, and Tomorrow",
        WYWH: "Wish You Were Here",
        TW: "The Winners",
        RBC: "Remarkably Bright Creatures",
        THN: "The Hotel Nantucket",
      };
      return books[value] || "";
    };
  
    // Helper function that accepts review object and creates the <li> element to later allocate it in the <ul> in reviews.html
    const createReviewElement = (review) => {
      const li = document.createElement("li");
      li.innerHTML = 
      `${review.fname} ${review.sname} Book: "${getBookTitle(review.book)}" Rating: ${review.rating} Stars
        <br>
        Comment:
        <br>
        ${review.comment}`;
        li.className = "book-home review";
      return li;
    };
    // helper function that accepts review object, turns it into <li> element and allocates it in <ul>
    const addReview = (review) => {
      const li = createReviewElement(review);
      reviewList.appendChild(li);
    };
   // when the submit button is clicked, event listener make the calls to read first name, surname, rating, book and comment itself. 
    submitReviewButton.addEventListener("click", () => {
      const fname = document.querySelector("#review-fname").value.trim();
      const sname = document.querySelector("#review-sname").value.trim();
      const rating = document.querySelector("#review-rating").value;
      const book = document.querySelector("#review-book").value;
      const comment = document.querySelector("#review-comment").value.trim();
      // checks if any of the fields are empty
      if (!fname || !sname || !comment) {
        alert("Please fill in all the fields.");
        return;
      }
      // checks if select values stayed on the default value
      if (book === "0" || rating === "0") {
        alert("Please select a book and a rating.");
        return;
      }
      // at this point, it is verified that fields are non-empty and the select elements have other value then the default.
      // function creates review object, parses JSON local storage back in object, adds our new review object and updates the local storage.
      // And also allocates the newely created <li> into the <ul> in reviews.html.
      const review = { fname, sname, rating, book, comment };
      const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      addReview(review);
    });
  
    // updating the html page to make sure that all the reviews are displayed.
    const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    storedReviews.forEach((review) => addReview(review));
 });


document.addEventListener("DOMContentLoaded", () => {
   // ADMIN CHANGES THE ORDER OF THE BOOKS USE CASE

   const adminButton = document.getElementById("admin-button");

   // when the button in admin.html gets pressed, create an array of select elements from admin.html
   adminButton.addEventListener("click", () => {
     const booksSelect = [
       document.getElementById("book1"),
       document.getElementById("book2"),
       document.getElementById("book3"),
       document.getElementById("book4"),
       document.getElementById("book5"),
     ];
 
     // take the values from the select fields.
     const selectedBooks = booksSelect.map((select) => select.value);
 
     // check if the value is default (choice was not made)
     if (selectedBooks.includes("0")) {
       alert("Please select an option in all fields.");
       return;
     }
 
     // check if a book was picked more then once 
     const uniqueBooks = selectedBooks.filter((value, index, self) => {
       return self.indexOf(value) === index;
     });
 
     if (uniqueBooks.length !== selectedBooks.length) {
       alert("Please pick distinct values for each field.");
       return;
     }
 
     // update local storage
     localStorage.setItem("bookOrder", JSON.stringify(selectedBooks));
 
     // redirect to home.html after updating the order
     window.location.href = "home.html";
   });
 
   // Call the helper function to update the home page 
   updateBookOrder();
 });
 
 window.updateBookOrder = updateBookOrder;



// LOGIN USE CASE


document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#login-button");
  
  loginButton.addEventListener("click", (event) => {
    
    const usernameInput = document.querySelector("#username");
    const username = usernameInput.value.trim();
    
    // check if username is empty
    if (!username) {
      alert("Please fill in the username field.");
      return;
    }
    
    // pull out the array of users from the local storage
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    // if user is not in the local storage - we update it
    if (users.indexOf(username) === -1) {
      users.push(username);
      localStorage.setItem("users", JSON.stringify(users));
    }
    
    // check if user is an admin and if they are- then redirect to the admin page, otherwise -redirect to the home
    if (username === "admin") {
      window.location.href = "admin.html";
    } else {
      alert(`Welcome, ${username}`);
      window.location.href = "home.html";
    }
  });
});
