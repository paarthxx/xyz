document.addEventListener('DOMContentLoaded', function() {
    fetch('digital.md')
        .then(response => response.text())
        .then(markdown => {
            document.getElementById('content').innerHTML = marked.parse(markdown);
        })
        .catch(error => {
            console.error('Error loading Markdown:', error);
        });
});