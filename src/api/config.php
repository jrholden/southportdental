<?php
/**
 * Created by PhpStorm.
 * User: Jordan
 * Date: 2018-06-26
 * Time: 6:23 PM
 */

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$config = array(
    "db" => array(
        "host" => "dashboard2012.dsidev.com",
        "username" => "cm",
        "password" => "Password1",

        "cmQueue" => array(
            "dbname" => "cm_queue",
            "mainTable" => "events"
        ),
        "brms" => array(
            "dbname" => "brms",
            "mainTable" => "main_request"
        ),
        "dq" => array(
            "dbname" => "deployment_request",
            "mainTable" => "main_request"
        ),
        "cm" => array(
            "dbname" => "cm",
            "mainTable" => "cobra_request"
        )
    ),
    "paths" => array(
        //"resources" => "/path/to/resources",
        "data" => $_SERVER["DOCUMENT_ROOT"] . "/cmqueue/data"
    )
);

/*
    Error reporting.
*/
ini_set("error_reporting", "true");
error_reporting(E_ALL | E_STRICT);
