%%

'\\'   return 'LAMBDA';
'.'    return 'DOT';
[a-z]  return 'IDENT';
'('    return 'LBRAC';
')'    return 'RBRAC';
\s+    ;
