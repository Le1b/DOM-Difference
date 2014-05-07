window.diff = function(dataBefore, dataAfter, result) {
    var arr;

    if (dataBefore == undefined && dataAfter == undefined) {
        var dataBefore = document.getElementById('before').children,
            dataAfter = document.getElementById('after').children,
            result = new Array();
            console.profile();
    }

    // console.log('result = ' + result);

    arr = dataBefore.length > dataAfter.length ? dataBefore : dataAfter;

    for (var i = 0; i < arr.length; i++) {

        if ((dataBefore[i] == undefined) || (dataAfter[i] == undefined)) {

            if (dataBefore[i] == undefined) {
                dataAfter[i].classList.add('added');
                result.push({
                    type: 'added',
                    element: dataAfter[i]
                });
            } else {
                dataBefore[i].classList.add('deleted');
                result.push({
                    type: 'removed',
                    element: dataBefore[i]
                });
            }

        } else if ((dataBefore[i].nodeName == dataAfter[i].nodeName) && (dataBefore[i].innerHTML == dataAfter[i].innerHTML)) {

            dataBefore[i].classList.add('blue');
            dataAfter[i].classList.add('blue');

        } else if ((dataBefore[i].nodeName == dataAfter[i].nodeName) && (dataBefore[i].innerHTML != dataAfter[i].innerHTML)) {


            diff(dataBefore[i].children, dataAfter[i].children, result);

            dataBefore[i].classList.add('changed');
            dataAfter[i].classList.add('changed');
            result.push({
                type: 'changed',
                beforeElement: dataBefore[i],
                afterElement: dataAfter[i],
                html: dataAfter[i].innerHTML
            });
        } else if (dataBefore[i].nodeName != dataAfter[i].nodeName) {
            dataBefore[i].classList.add('deleted');
            dataAfter[i].classList.add('added');
            result.push({
                type: 'added',
                element: dataAfter[i]
            });
            result.push({
                type: 'removed',
                element: dataBefore[i]
            });
        } else {
            console.log('else');
        }

    }
console.profileEnd();
    return result;
}
