$(document).ready(function(){
  //when someone hits a key on the search box...
  //use jQuery to target your search box (input form)
  $('#searchUser').on('keyup', function(e){
    //set username equal to the value of what the user entered.
    ________________>>>>let username = searchData(e);
    console.log(username);
    // Make 2 AJAX requests to Github...
    // 1st AJAX call is to get user information (i.e. name, description, etc.)
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '_____________________________',
        client_secret: '_____________________________'
      }
    })
    // when AJAX call is .done() running, run the callback function inside
    // 2nd AJAX call is to get user's REPO info (i.e. number of repos, project information, etc.)
    .done(function(user){
      // what variable needs to in CHANGE
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '_________________________________--',
          client_secret: '___________________________________',
          // make returned data display in ascending order
          sort: 'created: asc',
          per_page: 5
        }
      })
      // this is why we need two AJAX calls, to return the second repo...
      .done(function(repos){
        // use $.each to iterate over all of the repos
        $.each(repos, function(index, repo){
          // now we can inject our repo and user data for every instance of repos...
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${'.name'}</strong>: ${'.description'}
                </div>
                <div class="col-md-3">
                  <span class="label label-default"> Forks: ${'secret.forks_count'}</span>
                  <span class="label label-primary">Watchers: ${'.watchers_count'}</span>
                  <span class="label label-success">Stars: ${'.stargazers_count'}</span>
                </div>
                <div class="col-md-2">
                  <a href="${'.html_url'}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      // target the profile section, and use .html to inject HTML code inside of the #profile section
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repos: ${'secret2.public_repos'}</span>
              <span class="label label-primary">Public Gists: ${public_gists}</span>
              <span class="label label-success">Followers: ${followers}</span>
              <span class="label label-info">Following: ${following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${company}</li>
                <li class="list-group-item">Website/blog: ${blog}</li>
                <li class="list-group-item">Location: ${location}</li>
                <li class="list-group-item">Member Since: ${created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
