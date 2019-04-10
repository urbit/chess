/-  *chess
/+  *server
/=  index-html
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chess/index  /html/
/=  index-js
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chess/js/index  /js/
/=  index-css
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chess/css/index  /css/
/=  chess-png
  /^  (map knot @)
  /:  /===/app/chess/img  /_  /png/
=,  format
::
|%
:: +move: output effect
::
+$  move  [bone card]
:: +card: output effect payload
::
+$  card
  $%  [%poke wire dock poke]
      [%http-response =http-event:http]
      [%diff %json json]
  ==
+$  poke
  $%  [%modulo-bind app=term]
      [%modulo-unbind app=term]
      [%chess-command com=command]
  ==
+$  game  [fen=@t ori=@t]
+$  state
  $%  [%0 sta=(map @p (map @da game)) all=(set @p)]
  ==
--
::
|_  [bol=bowl:gall state]
::
++  this  .
::
++  prep
  |=  old=(unit state)
  ^-  (quip move _this)
  :-  [ost.bol %poke /chess [our.bol %modulo] [%modulo-bind %chess]]~
  ?~  old
    this
  %=  this
    sta  sta.u.old
    all  all.u.old
  ==
::
++  list-date-to-json
  |=  datlis=(list @da)
  ^-  json
  :-  %a
  %+  turn  datlis
    |=  dat=@da
    [%s (crip (scow %da dat))]
::
++  peer-list
  |=  [pax=path]
  ^-  (quip move _this)
  =/  pairpda  %+  turn  ~(tap in all)
    |=  a=@p
    ^-  [@p (list @da)]
    =/  asd  ~(tap in ~(key by (~(got by sta) a)))
    [a asd]
  =/  output
    %+  frond:enjs  %list
    :-  %a
    %+  turn  pairpda
      |=  [shp=@p lis=(list @da)]
      ^-  json
      %-  pairs:enjs
      :~  [%ship (ship:enjs shp)]
          [%dates (list-date-to-json lis)]
      ==
  [[ost.bol %diff %json output]~ this]
::
++  peer-game
  |=  [pax=path]
  ^-  (quip move _this)
  =/  shp  `@p`(slav %p &1:pax)
  =/  gid  `@da`(slav %da &2:pax)
  =/  allwshp  (~(get by sta) shp)
  ?~  allwshp
    [~ this]
  =/  agame  (~(get by u.allwshp) gid)
  ?~  agame
    [~ this]
  =/  obj  %-  my  :~
    fen+s+fen.u.agame
    orientation+s+ori.u.agame
  ==
  =/  output
    %+  frond:enjs  %game
    :-  %o  obj
  [[ost.bol %diff %json output]~ this]
::
++  poke-chess-command
  |=  com=command
  ^-  (quip move _this)
  ?-  -.com
    %new
      (handle-new-command com)
      ::
    %pos
      (handle-position-command com)
 ==
::
++  handle-new-command
  |=  com=command
  ^-  (quip move _this)
  ?-  -.com  %pos  !!  %new
  =/  allwshp  (~(get by sta) shp.+.com)
  =/  unix-da  (from-unix:chrono:userlib gid.+.com)
  =/  pokenew  ?:  =(src.bol our.bol)
    ?:  =(ori.+.com 'white')
      =/  newcom   com(shp our.bol, ori 'black')
      [ost.bol %poke /n [shp.+.com %chess] [%chess-command newcom]]~
    =/  newcom  com(shp our.bol, ori 'white')
    [ost.bol %poke /n [shp.+.com %chess] [%chess-command newcom]]~
  ~  
  ?~  allwshp
    =/  mapnewgame
      (~(put by *(map @da game)) unix-da ['' ori.+.com])
    :-  pokenew
    %=  this
      sta  (~(put by sta) shp.+.com mapnewgame)
      all  (~(put in all) shp.+.com)
    ==
  =/  mapnewgame  (~(put by u.allwshp) unix-da ['' ori.+.com])
  :-  pokenew
  %=  this
    sta  (~(put by sta) shp.+.com mapnewgame)
  ==
  ==
::
++  handle-position-command
  |=  com=command
  ^-  (quip move _this)
  ?-  -.com  %new  !!  %pos
  =/  allwshp  (~(get by sta) shp.+.com)
  ?~  allwshp
    [~ this]
  =/  unix-da  (from-unix:chrono:userlib gid.+.com)
  =/  agame  (~(get by u.allwshp) unix-da)
  ?~  agame
    [~ this]
  =/  newgame  (~(put by u.allwshp) unix-da [pos.+.com ori.u.agame])
  =/  newgameobj  %-  my  :~
    fen+s+pos.+.com
    orientation+s+ori.u.agame
  ==
  =/  pokenew 
   ?:  =(src.bol our.bol)
     [ost.bol %poke /n [shp.+.com %chess] [%chess-command com(shp our.bol)]]~
   ~
  =/  newmoves=(list move)
    ?:  =(src.bol our.bol)
      ~
    %+  turn  (prey:pubsub:userlib /game/[(scot %p shp.+.com)]/[(scot %da unix-da)] bol)
    |=  [=bone ^]
    =/  output
      %+  frond:enjs  %game
      :-  %o  newgameobj
    [bone %diff %json output]
  :-  (weld pokenew newmoves)
  %=  this
    sta  (~(put by sta) shp.+.com newgame)
  ==
  ==
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol move this)
  |=  =inbound-request:http-server
  ^-  (quip move _this)
  =+  request-line=(parse-request-line url.request.inbound-request)
  =+  back-path=(flop site.request-line)
  =/  name=@t
    =+  back-path=(flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ::
  ?~  back-path
    :_  this  ~
  ?:  (lte (lent back-path) 1)
    [[ost.bol %http-response (html-response:app index-html)]~ this]
  ?:  =(&2:back-path 'img')
    =/  img  (as-octs:mimes:html (~(got by chess-png) `@ta`name))
    [[ost.bol %http-response (png-response:app img)]~ this]
  ?:  =(name 'chessboard-js')
    [[ost.bol %http-response (js-response:app index-js)]~ this]
  ?:  =(name 'chessboard-css')
    [[ost.bol %http-response (css-response:app index-css)]~ this]
  [[ost.bol %http-response (html-response:app index-html)]~ this]
--
