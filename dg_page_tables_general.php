<?php include 'inc/config.php'; ?>
<?php include 'inc/template_start.php'; ?>
<?php include 'inc/page_head.php'; ?>

<!-- Page content -->
<div id="page-content">
    <!-- Table Styles Header -->
    <div class="content-header">
        <div class="header-section">
            <h1>
                <i class="gi gi-table"></i>Tables<br><small>Professional looking tables for your data!</small>
            </h1>
        </div>
    </div>
    <ul class="breadcrumb breadcrumb-top">
        <li>Tables</li>
        <li><a href="">General</a></li>
    </ul>
    <!-- END Table Styles Header -->

    <!-- Table Styles Block -->
    <div class="block">
        <!-- Table Styles Title -->
        <div class="block-title">
            <h2><strong>Table</strong> Styles</h2>
        </div>
        <!-- END Table Styles Title -->
        <div class="table-responsive" style="width: 350px;">
            <table id="general-table" class="table table-striped table-vcenter">
                <thead>
                    <tr>
                        <th>Outlet</th>
                        <th>Tickets</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <?php
                    $jsonData = file_get_contents("http://www.biota-labs.com/ei/sales/ei_return_sales_total.php?clientid=1&campaignid=30");
                    $phpArray = json_decode($jsonData, true);
                    foreach ($phpArray as $key => $value) {         
                        echo '<tr>
                        <td>'.$value["outlet"].'</td>
                        <td>'.$value["volume"].'</td>
                        <td>£'.$value["value"].'</td>
                        <td><button type="button" class="btn btn-sm btn-success">View</button></a></td>
                        </tr>';    
                    }
                    ?>  
                </tbody>
            </table>
        </div>
        <!-- END Table Styles Content -->
    </div>
    <!-- END Table Styles Block -->
</div>
<!-- END Page Content -->

<?php include 'inc/page_footer.php'; ?>
<?php include 'inc/template_scripts.php'; ?>
<!-- Load and execute javascript code used only in this page -->
<script src="js/pages/tablesGeneral.js"></script>
<script>$(function(){ TablesGeneral.init(); });</script>

<?php include 'inc/template_end.php'; ?>