console.log("Sanity Check: JS is working!");

$(document).ready(function(){


  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/albums',
    success: handleSuccess,
    error: handleError
  });


});


const handleSuccess = (json) => {
  // takes an array of albums and renders them as an unordered list
  let albums = json;
  // iterate through json response - return a joined array of data with html encoding
  let outputHtml = `
    <ul>
      ${albums.map((album) => `
        <li>
          ${album.artist} -- ${album.title}
        </li>`).join('')}
    </ul>`;
    console.log(outputHtml)
  $('#albumTarget').html(outputHtml);
}

const handleError = (jqXHR, status, error) => {
  console.log('uh oh');
  $('#albumTarget').text(`Failed to load albums, is the server working? Error: ${error}`);
}
