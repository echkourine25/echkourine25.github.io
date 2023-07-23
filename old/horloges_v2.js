var tab_jour_semaine=new Array(
 'Dimanche',
 'Lundi',
 'Mardi',
 'Mercredi',
 'Jeudi',
 'Vendredi',
 'Samedi');
var tab_mois_annee=new Array(
 'Janvier',
 'Février',
 'Mars',
 'Avril',
 'Mai',
 'Juin',
 'Juillet',
 'Août',
 'Septembre',
 'Octobre',
 'Novembre',
 'Décembre');
/* Tableau des régions et de leur utc
0=Region
1=TimeZone
2=UTC Hiver
3=UTC Ete
4=Mois changement d'horraire 1 (mars)
5=Heure changement d'horraire 1
6=Minutes changement d'horraire 1
7=Règle de changement d'horraire (0 europe) 1
8=Mois changement d'horraire 2 (octobre)
9=Heure changement d'horraire 2
10=Minutes changement d'hooraire 2
11=Règle de changement d'horraire (0 europe) 2*/
var tab_utc_region=new Array();
tab_utc_region[10]=new Array(
'Almaty','UTC+6',
+06,+06,0,0,-1,0,0,0,-1);
tab_utc_region[0]=new Array(
 'Paris',
 'Europe/Paris',
 +01,+02,2,2,0,0,9,3,0,0);
tab_utc_region[1]=new Array(
 'Guadeloupe',
 'America/Guadeloupe',
 -04,-04,2,2,0,0,9,3,0,0);
tab_utc_region[2]=new Array(
 'Guyane',
 'America/Cayenne',
 -03,-03,2,2,0,0,9,3,0,0);
tab_utc_region[3]=new Array(
 'Martinique',
 'America/Martinique',
 -04,-04,2,2,0,0,9,3,0,0);
tab_utc_region[4]=new Array(
 'Mayotte',
 'Indian/Mayotte',
 +03,+03,2,2,0,0,9,3,0,0);
tab_utc_region[5]=new Array(
 'Nouvelle Caledonie',
 'Pacific/Noumea',
 +11,+11,2,2,0,0,9,3,0,0);
tab_utc_region[6]=new Array(
 'Polynesie',
 'Pacific/Tahiti',
 -10,-10,2,2,0,0,9,3,0,0);
tab_utc_region[7]=new Array(
 'Reunion',
 'Indian/Reunion',
 +04,+04,2,2,0,0,9,3,0,0);
tab_utc_region[8]=new Array(
 'Pierre & Miquelon',
 'America/Miquelon',
 -03,-02,2,2,0,0,9,3,0,0);
 tab_utc_region[9]=new Array(
  'Wallis & Futuna',
  'Pacific/Wallis',
  +12,+12,2,2,0,0,9,3,0,0);
// Tableau fonction qui retourne l'id associé à une région
function get_id_region(region){
 var tab_utc_region_id=new Array();
 tab_utc_region_id['test']			=10;
 tab_utc_region_id['Paris']			=0;
 tab_utc_region_id['Guadeloupe']		=1;
 tab_utc_region_id['Guyane']			=2;
 tab_utc_region_id['Martinique']		=3;
 tab_utc_region_id['Mayotte']			=4;
 tab_utc_region_id['Nouvelle Caledonie']	=5;
 tab_utc_region_id['Polynesie']			=6;
 tab_utc_region_id['Reunion']			=7;
 tab_utc_region_id['Pierre & Miquelon']		=8;
 tab_utc_region_id['Wallis & Futuna']		=9;
 return tab_utc_region_id[region];
}
// Retourne le timestamp utc0
function get_ts_utc0(){
 var dt=new Date();
 var tswtz=dt.getTime();
 var dbualtz=dt.getTimezoneOffset();
 return tswtz+dbualtz*60000;
}
// Retourne la date d'une région à son méridien
function get_dt_meridien_region(region){
 return new Date(get_ts_utc0()+3600000*region);
}
//! d') Retourne les deux dates de changement d'heure
function get_dt_time_switch(year,month,day,hour,min){
 // Déclare un tableau
 dt=new Array;
 idt=new Array;
 for(	// Initialise la date à 0
 dt[0]=new Date(0),
 dt[0].setFullYear(year[0]),
 dt[0].setMonth(month[0]),
 dt[0].setHours(hour[0]),
 dt[0].setMinutes(min[0]),
 // Initialise la date d'incrémentation à 0
 idt[0]=dt[0];
 // Tant que le mois de la date d'incrémentation est égal au mois concerné
 idt[0].getMonth()==month[0];
 // Incrémenter la date d'incrémentation d'un jour
 idt[0]=new Date(idt[0].getTime()+86400000)){
  // Si nous sommes le jour de la semaine concernée (0 pour dimanche par exemple)
  if(idt[0].getDay()==day[0]){
   // Modifier la date en fixant le jour concerné
   dt[0].setDate(idt[0].getDate());
  }
 }	// Une seconde fois pour le passage d'heure été->hiver
 for(	dt[1]=new Date(0),
 dt[1].setFullYear(year[1]),
 dt[1].setMonth(month[1]),
 dt[1].setHours(hour[1]),
 dt[1].setMinutes(min[1]),
 idt[1]=dt[1];
 idt[1].getMonth()==month[1];
 idt[1]=new Date(idt[1].getTime()+86400000)){
  if(idt[1].getDay()==day[1]){
   dt[1].setDate(idt[1].getDate());
  }
 }
 // retourne le tableau des dates
 return dt;
}
//////////////////////////////////////////////////
//! I) Retourne la date de la région
function get_dt_region(region){ 
 //!  a) Récupère la date de la région à son méridien
 var dt_meridien_region=get_dt_meridien_region(region[2]);
 //!  c) Si il n'y a pas de changement d'heure ete/hiver retourner la date
 if(region[2]==region[3]){
  return dt_meridien_region;
 }else if(region[2]!=region[3]){
  //!  b) Récupère les deux dates de changement d'horraire dans un tableau
  var year=new Array(dt_meridien_region.getFullYear(),dt_meridien_region.getFullYear());
  var month=new Array(region[4],region[8]);
  var day=new Array(0,0);
  var hour=new Array(region[5],region[9]);
  var min=new Array(region[6],region[10]);
  var tab_dt_changement_region=new Array();
  var tab_dt_changement_region=get_dt_time_switch(year,month,day,hour,min);
  if(dt_meridien_region.getTime()>=tab_dt_changement_region[0].getTime() && dt_meridien_region.getTime()<tab_dt_changement_region[1].getTime()){
   return new Date(dt_meridien_region.getTime()-((region[2]-region[3])*3600000));
  }else{
   return dt_meridien_region;
  }
 }
}
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
function time_write_and_refresh(i){
 var dt=get_dt_region(tab_utc_region[i]);
 //document.write(dt.getDate()+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear()+''+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds());
 document.getElementById('date_'+i).innerHTML=checkTime(dt.getDate())+'&nbsp;/&nbsp;'+(dt.getMonth()+1)+'&nbsp;/&nbsp;'+dt.getFullYear();
 document.getElementById('heure_'+i).innerHTML=checkTime(dt.getHours())+':'+checkTime(dt.getMinutes())+':'+checkTime(dt.getSeconds());
 //t=setTimeout('time_write_and_refresh()',500);
}
function time_refresh(i){
 setInterval(function(){time_write_and_refresh(i)},500);
}
document.write('<TABLE cellpadding="5px" align="center" border="1"; style="border-collapse:collapse;width:800px;"><caption><b><u>Horloges</u></b></caption>');
document.write('<TR align="center" style="background-color:#000000;color:white;"><TH style="width:25%;">Région</TH><TH style="width:25%;">Timezone</TH><!-- <TH style="width:15%;">Heure d&#39;hiver</TH><TH style="width:15%">Heure d&#39;été</TH> --> <TH style="width:25%;">Date</TH></TH><TH style="width:25%;">Heure</TH></TR>');
    for(var i=0,j=0;i<11;i++){
	if(j==0){
	 document.write('<TR style="background-color:#FFFFFF;">');
	 j++;
	}else{
	 document.write('<TR style="background-color:#EEEEEE;">');
	 j--;
	}
        document.write(
        '<TD>'+tab_utc_region[i][0]+'</TD>'+
        '<TD>'+tab_utc_region[i][1]+'</TD>'+
        //'<TD align="right">'+tab_utc_region[i][3]+'</TD>'+
        //'<TD align="right">'+tab_utc_region[i][2]+'</TD>'+
        '<TD align="center" id="date_'+i+'"></TD>'+
	'<TD align="center" id="heure_'+i+'"></TD></TR>');
	time_refresh(i);
    }
    document.write("</TABLE>");
