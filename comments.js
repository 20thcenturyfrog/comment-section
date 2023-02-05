const commentContainer = document.getElementById("allComments");
const anonymous = document.getElementById("checkbox");
anonymous.onclick = checkAnon;

function checkAnon() {
  if (this.checked) {
    document.getElementById("name").disabled = true;
    document.getElementById("name").style.backgroundColor = "#A9A9A9";
    document.getElementById("name").placeholder = "";
    document.getElementById("url").disabled = true;
    document.getElementById("url").style.backgroundColor = "#A9A9A9";
    document.getElementById("url").placeholder = "";
  } else if (this.checked == false) {
    document.getElementById("name").disabled = false;
    document.getElementById("name").style.backgroundColor = "#F5F5DC";
    document.getElementById("name").placeholder = "Иванов Иван Иванович";
    document.getElementById("url").disabled = false;
    document.getElementById("url").style.backgroundColor = "#F5F5DC";
    document.getElementById("url").placeholder = "https://example.com";
  }
}

const button = document.getElementById("addComment");
button.onclick = addComment;

function addComment() {
  const nameText = document.createElement("div");
  nameText.className = "name";

  const urlImage = document.createElement("img");
  urlImage.className = "image";

  const imageArray = [
    "https://cdn-icons-png.flaticon.com/512/185/185852.png",
    "https://cdn-icons-png.flaticon.com/512/185/185816.png",
    "https://cdn-icons-png.flaticon.com/512/185/185807.png",
    "https://cdn-icons-png.flaticon.com/512/185/185840.png",
    "https://cdn-icons-png.flaticon.com/512/185/185835.png",
    "https://cdn-icons-png.flaticon.com/512/185/185839.png",
    "https://cdn-icons-png.flaticon.com/512/185/185806.png",
    "https://cdn-icons-png.flaticon.com/512/185/185808.png",
    "https://cdn-icons-png.flaticon.com/512/185/185812.png",
    "https://cdn-icons-png.flaticon.com/512/185/185813.png",
    "https://cdn-icons-png.flaticon.com/512/185/185814.png",
    "https://cdn-icons-png.flaticon.com/512/185/185817.png",
    "https://cdn-icons-png.flaticon.com/512/185/185818.png",
    "https://cdn-icons-png.flaticon.com/512/185/185820.png",
    "https://cdn-icons-png.flaticon.com/512/185/185823.png",
    "https://cdn-icons-png.flaticon.com/512/185/185826.png",
    "https://cdn-icons-png.flaticon.com/512/185/185829.png",
    "https://cdn-icons-png.flaticon.com/512/185/185830.png",
    "https://cdn-icons-png.flaticon.com/512/185/185844.png",
    "https://cdn-icons-png.flaticon.com/512/185/185847.png",
  ];

  const date = new Date().toLocaleString();
  date.className = "date";

  const commentText = document.createElement("div");
  commentText.className = "comment";

  const nameImageWrapper = document.createElement("div");
  nameImageWrapper.className = "nameImageWrapper";

  const nameImageDateWrapper = document.createElement("div");
  nameImageDateWrapper.className = "nameImageDateWrapper";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  function checkFill() {
    if (document.getElementById("comment").value == "") {
      document.getElementById("warning").style.display = "block";
    } else if (document.getElementById("comment").value != "") {
      document.getElementById("warning").style.display = "none";

      function createHTML() {
        nameImageWrapper.append(urlImage, nameText);
        nameImageDateWrapper.append(nameImageWrapper, date);
        wrapper.append(nameImageDateWrapper, commentText);
        commentContainer.appendChild(wrapper);
      }

      createHTML();
    }
  }

  checkFill();

  function makeAnonOrPublicComment() {
    if (
      document.getElementById("name").disabled == true ||
      document.getElementById("name").value == ""
    ) {
      nameText.textContent = "Username";
    } else if (document.getElementById("name").disabled == false) {
      let checkedName = document.getElementById("name").value;

      function checkName() {
        checkedName = checkedName
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase()
          .split(" ");

        for (let i = 0; i < checkedName.length; i++) {
          checkedName[i] =
            checkedName[i][0].toUpperCase() + checkedName[i].slice(1);
        }

        checkedName = checkedName.join(" ");

        return checkedName;
      }

      nameText.textContent = checkName();
      document.getElementById("name").value = "";
    }
  }

  makeAnonOrPublicComment();

  function getRandomImage() {
    if (
      document.getElementById("url").disabled == true ||
      document.getElementById("url").value == ""
    ) {
      let randomImageIndex = Math.floor(Math.random() * imageArray.length);
      let randomImage = imageArray[randomImageIndex];
      urlImage.src = randomImage;
    } else if (document.getElementById("url").disabled == false) {
      urlImage.src = document.getElementById("url").value;
      document.getElementById("url").value = "";
    }
  }

  getRandomImage();

  let checkedForSpam = document.getElementById("comment").value;

  function checkForSpam() {
    if (
      /viagra/i.test(checkedForSpam) === true ||
      /XXX/i.test(checkedForSpam) === true
    ) {
      checkedForSpam = checkedForSpam.replace(/viagra/gi, "***");
      checkedForSpam = checkedForSpam.replace(/XXX/gi, "***");
    }

    return checkedForSpam;
  }

  function addCommentText() {
    commentText.textContent = checkForSpam();
    document.getElementById("comment").value = "";
  }

  addCommentText();
}
