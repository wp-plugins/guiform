<?php

abstract class GuiForm_Extend {
    // array containing all the extended classes
    private $_exts = array();
    public $_this;
       
    function __construct(){$_this = $this;}
   
    public function addExt($object)
    {
        $this->_exts[]=$object;
    }
   
    public function __get($varname)
    {
        foreach($this->_exts as $ext)
        {
            if(property_exists($ext,$varname))
            return $ext->$varname;
        }
    }
   
    public function __call($method,$args)
    {
        foreach($this->_exts as $ext)
        {
            if(method_exists($ext,$method))
            return call_user_method_array($method,$ext,$args);
        }
        throw new Exception("This Method {$method} doesn't exists");
    }
   
   
}