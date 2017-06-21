require(["gitbook", "jQuery"], function(gitbook, $) {
    gitbook.events.bind("page.change", function(e, config) {
            var bqs = $('.jp-hints > div');
            bqs.each(function(index, a) {
                a = $(a);

                /* Additional class for tostr style */
                /* Set icon on top if height > 100px */
                if(a.is(':has(h4)')) {
                    a.addClass("bg-pos-top");
                }

            });
    });
});

