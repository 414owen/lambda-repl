%{

const { astNewApp, astNewFunc, astNewVar } = require('./ast');
const postParse = require('./postParse');

%}

%start start

%%

start: expr {{ $$ = postParse($1); }};
expr: applist | lastapp | lambda;
lastapp: applist lambda {{ $$ = astNewApp($1, $2); }};
applist: applist callableExpr {{ $$ = astNewApp($1, $2); }} | callableExpr;
callableExpr: bracexpr | var;
lambda: LAMBDA curry {{ $$ = $2; }};
curry: DOT expr {{ $$ = $2; }} | IDENT curry {{ $$ = astNewFunc($1, $2); }};
bracexpr: LBRAC expr RBRAC {{ $$ = $2; }};
var: IDENT {{ $$ = astNewVar($1); }};
