<?php
    $data = json_decode(file_get_contents("dump/" . date("Y-m-d") . ".json"));
?>

<!DOCTYPE html>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-language" content="en">
    <title>Asset Store</title>
  
<body data-gr-c-s-loaded="true" class="external-browser language-en" id="ascon35364">
    <div id="content">
        <div id="content-panels">
            <section id="mainContent" class="main-contentpage">

            <div id="contentpage">
            <div class="main-content">
        
            <div id="contentoverview" class="div">
                <div class="content-container" itemscope="" itemtype="http://schema.org/Product">
		    <div class="background">
                        <img class="bg1" src="http:<?php echo $data->icon; ?>">
                    </div>
                    
                    <div class="blocked full">
                        <div class="overview-text-overlay">

                            <h1 itemprop="name"><?php echo "<a href=https://www.assetstore.unity3d.com/en/#!/content/" . $data->id . ">" . $data->title . "</a>"; ?></h1>
                            
                            <div class="details-container">
                                <div class="details">
                                    <?php echo $data->category; ?><br>
                                    <?php echo $data->author; ?><br>
                                    <br>
                                    <div class="sale quote primary-id-35364" "=""><div class="percentage"><?php echo $data->percentage; ?><span class="pct">%</span> <span class="off">OFF</span></div></div>
                                    <div class="price quote primary-id-35364"><?php echo $data->price; ?><del><?php echo $data->rrp; ?></del></div>
                                    <div class="upgrade quote primary-id-35364"></div>
                                </div>
        
                            </div>


                            <div class="fulldescription vscroll">
                            <?php echo $data->description; ?>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </section>
        </div>
    </div>
</body>

</html>
