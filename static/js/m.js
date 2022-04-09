j = jQuery.noConflict();
~ function(w, j) {

    w.folder = location.pathname.split("/").slice(1);
    w.tool = {
        isFunc: function(f) {
            return typeof f === 'function'
        },
        post: function(z) {
            var a = {
                url: z.url,
                data: JSON.stringify(z.data),
                type: 'post',
                dataType: 'json',
                beforeSend: function(xhr) {
                    if (w.tool.isFunc(z.bfunc)) z.bfunc(xhr);
                },
                success: function(d) {
                    if (d.code != 0) alert(d.msg);
                    else if (w.tool.isFunc(z.func)) z.func(d.data);
                }
            };
            a.contentType = "application/json";
            return j.ajax(a);
        }
    }

    var p = new URL(location);
    w.GET = function(n) {
        return p.searchParams.get(n);
    }
    w.SET = function(k, v) {
        p.searchParams.set(k, v)
    }

    w.TO = function(k, v) {
        location = p
    }


}(window, j)