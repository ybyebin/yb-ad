var adData = {
    type: 0,
    hitNum: 5, //攻击次数,
    playNum: 1 //玩的次数
}
$(function () {
    // loader.start();
    $('.des').addClass('bounceIn');
    init()
    checkWeapen()
    setTimeout(function () {
        $('.des, .mask').hide()
    }, 2000)

});

function init() {
    $('.sec').one('click', function () {
        $('.des, .mask').hide()
    })
    // 攻击
    $('#fire').click(function () {
      
    })

    $('.btn-play-again').click(function () {
        playAgain()
    })
}

function checkWeapen() {
    $('.weapon').click(function () {
        var that = $(this);
        // var className = 'weapon-active';
        adData.type = Number(that.data('type'));
        // $('.weapon').removeClass(className);
        // that.addClass(className)


        if (adData.hitNum > 0) {
            if (adData.type) {
                adData.hitNum -= 1;
                var str = '';
                switch (adData.type) {
                    case 1:
                        str = 'stone';
                        break;
                    case 2:
                        str = 'feibiao';
                        break;
                    case 3:
                        str = 'feidao';
                        break;
                    case 4:
                        str = 'nujian';
                        break;
                    default:
                        break;

                }
                var clas = '.weap-' + str;
                var claMove = ' weapen-' + str + '-move'
                // var num = 
                var hit = $('.hit')
                var man = $('#man')
                var manHit = $('#man-hit')
                var nums = $('.num-' + str)
                $(clas).on('animationend', function () {
                    hit.show()
                    manHit.show()
                    man.hide()
                    setTimeout(function () {
                        $(clas).hide().removeClass(claMove)
                        hit.hide()
                        manHit.hide()
                        man.show()

                        if (adData.hitNum === 0) {
                            checkFailOrSuccess()
                        }
                    }, 300)
                }).show().addClass(claMove)
                nums.text(Number(nums.text()) - 1)
                setBlood()
            }
        } else {
            checkFailOrSuccess()
        }




    })
}

function setBlood() {
    // width 5.78rem
    var unit = 0;
    switch (adData.type) {
        case 1:
            unit = 5
            break;
        case 2:
            unit = 10
            break;
        case 3:
            unit = 15
            break;
        case 4:
            unit = 20
            break;
        default:
            break;

    }
    var blood = $('#blood')
    var numVal = Number(blood.data('width'))
    var newnumVal = numVal - unit
    blood.data('width', newnumVal);
    blood.width(newnumVal + '%')
    $('.blood-value').text(newnumVal);

}

function fail() {
    $('.fail-hua').show();
    setTimeout(function () {
        $('.flag ,.mask').show()
        isThird()
    }, 2000)
}

function success() {
    $('.success').show();
    setTimeout(function () {
        $('.suc-2').show();
        setTimeout(function () {
            isThird()
            $('.suc-btn').show()

        }, 2000)
    }, 2000)
}

function isThird() {
    if (adData.playNum > 2) {
        $('.btn-play-again').hide()
    }
}

function playAgain() {
    adData.type = 0;
    adData.hitNum = 5;
    adData.playNum += 1;
    $('.num-stone, .num-feibiao, .num-feidao ,.num-nujian').text(10)
    $('.mask, .flag,.fail-hua').hide()
    $('.weapon').removeClass('weapon-active');
    var blood = $('#blood')
    var value = 100
    blood.data('width', value);
    blood.width(value + '%')
    $('.blood-value').text(value);
    $('.success,.suc-2,.suc-btn').hide()
}

function checkFailOrSuccess() {
    var val = Number($('#blood').data('width'))
    if (val > 60) {
        fail()
    } else {
        success()
    }
}