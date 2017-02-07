module.exports =
    $(document).ready(() => {
        $('.delete-button').click({
            var shouldDelete = confirm("Are your sure?");
            if (shouldDelete) {
                window.location.href('/delete/#{task.id}');
            }
        });
    });
