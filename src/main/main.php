<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>System of a down</title>
</head>

<body>
    <header>
        <h1 class="underline">
            System Of A Down
        </h1>
    </header>
    <main>
        <section id="heading">
            <div class="heading-info">
                <h5 class="heading-text">
                    Concerns greatest margaret him absolute entrance nay. Door neat week do find past he. Be no surprise
                    he honoured indulged. Unpacked endeavor six steepest had husbands her. Painted no or affixed it so
                    civilly. Exposed neither pressed so cottage as proceed at offices. Nay they gone sir game four.
                    Favourable pianoforte oh motionless excellence of astonished we pr
                </h5>
                <img src="../common/img/toxicity.jpeg" alt="" class="heading-img">
            </div>
            <img src="../common/img/guitar.svg" alt="" class="heading-guitar">
        </section>
        <section class="concerts">
            <h1 class="underline title-concerts">
                Our next concerts
            </h1>
        </section>
    </main>
    <footer></footer>
    <div class="modal-form-prenotation hidden">
        <div class="modal-heading">
            <h2 class="underline">
                System Of A Down
            </h2>

            <img src="../common/img/close.svg" alt="" class="modal-close">
        </div>
        <form>
            <input type="text" name="input-name" placeholder="name" class="input-text-only black-color">
            <input type="text" name="input-lastname" placeholder="lastname" class="input-text-only black-color">
            <input type="email" name="input-email" placeholder="email" class="black-color">
            <div class="wrapper-checkbox">
                <input type="checkbox" name="checkbox-all" value="">
                <h6>
                    Buy ticket for the next concert too
                </h6>
            </div>
            <button type="submit">
                <h4 class="button-buy black-color">
                    Buy ticket
                </h4>
            </button>
        </form>
        <div class="wrapper-ticket hidden">
            <h4 style="text-align: center;">Your tickets ID: #<span class="red-color tikcets-id-inner"></span><br><br>Please take some ID document at the consert
                <br>See you later :)</h4>
        </div>
    </div>
</body>
<script src="./js/view-main.js" type="module"></script>

</html>