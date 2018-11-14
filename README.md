# Pure-Lambda-JS

**New and shiny** - check out the [live demo](https://owen.cafe/try-lambda/).

This is a JavaScript port of my C lambda parser / reducer found [here](https://github.com/414owen/pure-lambda).

I use Jison as a parser generator, and [De Bruijn indices](https://en.wikipedia.org/wiki/De_Bruijn_index) to enable the step-by-step reduction logic.

This interpreter understands expressions that look like this:


```
ab
\a.a
(\a.a)b
(\ab.ba)\cc.c
(\a.a)(\b.b)(\c.cc)da
```

...and will reduce them, something like this:

```
> (\a.a)(\b.b)(\c.cc)da
(a->a)(b->b)(c->cc)da
(b->b)(c->cc)da
(c->cc)da
dda
```
