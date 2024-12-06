import $ from 'jquery';


interface RepeaterOptions {
    initEmpty: boolean;
    defaultValues: {
        'text-input': string;
    };
    show: () => void;
    hide: (deleteElement: boolean) => void;
    isFirstItemUndeletable: boolean;
}


$(document).ready(function() {

    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function() {
            $(this).slideDown();
        },
        hide: function(deleteElement: boolean) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    } as RepeaterOptions); 
});


function generateCV() {

    console.log('CV generated!');
}
