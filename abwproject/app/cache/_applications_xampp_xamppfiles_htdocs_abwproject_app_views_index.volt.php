<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <?= $this->tag->getTitle() ?>
        <?= $this->tag->stylesheetLink('css/bootstrap.min.css') ?>
        <?= $this->tag->stylesheetLink('css/bootstrap-datetimepicker.min.css') ?>
        <?= $this->tag->javascriptInclude('js/jquery-3.1.1.min.js') ?>
        <?= $this->tag->javascriptInclude('js/bootstrap.min.js') ?>
        <?= $this->tag->javascriptInclude('js/moment.js') ?>
        <?= $this->tag->javascriptInclude('js/bootstrap-datetimepicker.min.js') ?>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-inverse" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Travel Site</a>
                </div>
                <?= $this->headerElements->getMenu() ?>
            </div>
        </nav>
        <div class="container">
            <?= $this->flash->output() ?>
            <?= $this->getContent() ?>
            <hr>
            <footer>
                <p>wolowlwow</p>
            </footer>
        </div>
    </body>
</html>
