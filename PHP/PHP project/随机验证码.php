<?php 
	session_start();
	$length = 5;
	$string = '';
	$arr = array(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0);
	$arrlength = count($arr);
	for($i = 0;$i < $length;$i++)
		$string.=$arr[rand(0,$arrlength-1)];
	$_SESSION['val'] = $string;
	//echo $string;
	
	$font = 'C:/Windows/fonts/AdobeFanHeitiStd-Bold.otf';
	$size = 12;
	$im = imageCreateFromPNG('button.png');
	$tsize = imagettfbbox($size,0,$font,$string);
	
	$dx = abs($tsize[2]-$tsize[0]);
	$dy = abs($tsize[5]-$tsize[3]);
	$x = (imagesx($im)-$dx)/2;
	$y = (imagesy($im)-$dy)/2+$dy;
	
	$black = imageColorAllocate($im,1,1,1);
	ImageTTFText($im,$size,0,$x,$y,$black,$font,$string);
	
	header('Content-type:image/png');
	imagePNG($im);
	imagedestory($im);
?>
