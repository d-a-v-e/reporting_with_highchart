<?php include 'inc/config.php'; ?>
<?php include 'inc/template_start.php'; ?>
<?php include 'inc/page_head.php'; ?>

<!-- Page content -->
<div id="page-content">
    <!-- Blank Header -->
    <div class="content-header">
        <div class="header-section">
            <h1>XXYY - European Tour
                <br><small>Sales Data...</small>
            </h1>
        </div>
    </div>
    <!-- END Blank Header -->

    <!-- Classic and Bars Chart -->
    <div class="row">
        
            <!-- Bars Chart Block -->
            <div class="block full">
                <!-- Bars Chart Title -->
                <div class="block-title">
                    <h2><strong>Bars</strong> Chart</h2>
                </div>
                <!-- END Bars Chart Title -->

                <!-- Bars Chart Content -->
                <!-- Flot Charts (initialized in js/pages/compCharts.js), for more examples you can check out http://www.flotcharts.org/ -->
                <div id="chart-bars" class="chart"></div>
                <!-- END Bars Chart Content -->
            </div>
            <!-- END Bars Chart Block -->
        
    </div>
    <!-- END Classic and Bars Chart -->
</div>
<!-- END Page Content -->

<?php include 'inc/page_footer.php'; ?>
<?php include 'inc/template_scripts.php'; ?>
<!-- <script src="js/dgjs/dg_compCharts.js"></script>
<script>$(function(){ CompCharts.init("http://localhost:8888/practice/jsontest.json"); });</script> -->
<script src="js/dgjs/dg_barCharts.js"></script>
<script>$(function(){ BarCharts.init(); });</script>
<?php include 'inc/template_end.php'; ?>