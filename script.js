const userInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const profileCard = document.getElementById("profileCard");
const avatar = document.getElementById("avatar");
const userName = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const profileLink = document.getElementById("profileLink");

searchBtn.addEventListener("click", () => {
  const username = userInput.value.trim();
  if (!username) return;
  profileFinder(username);
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

function showProfile(data) {
  avatar.setAttribute("src", data.avatar_url || "");
  avatar.setAttribute("alt", `${data.login}'s avatar`);
  userName.textContent = data.name || data.login;
  login.textContent = `@${data.login}`;
  bio.textContent = data.bio || "No bio available";
  repos.textContent = data.public_repos ?? 0;
  followers.textContent = data.followers ?? 0;
  following.textContent = data.following ?? 0;
  profileLink.setAttribute("href", data.html_url);
  profileCard.style.display = "block";
}

async function profileFinder(username) {
  try {
    profileCard.style.display = "none";
    error.style.display = "none";
    loading.style.display = "block";

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No user found with this username!");
      } else if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error("Something went wrong — try again!");
      }
    }

    const data = await response.json();
    showProfile(data);
  } catch (err) {
    error.style.display = "block";
    error.textContent =
      err.message || "Failed to fetch data. Check your connection.";
  } finally {
    loading.style.display = "none";
  }
}
