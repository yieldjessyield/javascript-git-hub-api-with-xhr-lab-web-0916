
  // get info from user
  // make request to api with repo name

$(function(){
  $('.flexbox-container').on('submit', function(){
    event.preventDefault()
    let username = $("input").val()
    let url = `https://api.github.com/users/${username}/repos`
    getRepositories(url)
  })
})




function getRepositories(myUrl){

    $.ajax({
    method: "GET",
    url: myUrl,
  }).done(function(repos) {
  displayRepositories(repos)
})
}


function displayRepositories(repos) {

  // problem here!! Response is getting passed in weird
  let repolist = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.full_name + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repo="' + r.full_name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`

  document.getElementById("repositories").innerHTML = repolist
  }



function getCommits(repoName){
// debugger
    $.ajax({
    method: "GET",
    url: `https://api.github.com/repos/${repoName.dataset.repo}/commits`

  }).done(function(repos) {
  displayCommits(repos)
})
}

function displayCommits(commits) {

  let commitlist = `<ul>${commits.map(c => '<li><strong>' + c.commit.author.name + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`
// debugger
  document.getElementById("details").innerHTML = commitlist
  }

  function getBranches(repoName){
// debugger
    $.ajax({
    method: "GET",
    url: `https://api.github.com/repos/${repoName.dataset.repo}/branches`

  }).done(function(branches) {
  displayBranches(branches)
})
}


function displayBranches(branches) {
  // debugger
  let branchList = `<ul>${branches.map(b => '<li><strong>' + b.name + '</strong></li>').join('')}</ul>`
// debugger
  document.getElementById("details").innerHTML = branchList
  }
