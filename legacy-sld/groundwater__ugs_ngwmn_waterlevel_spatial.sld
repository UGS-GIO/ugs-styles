<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>groundwater:ugs_ngwmn_waterlevel_spatial</sld:Name>
        <sld:UserStyle>
            <sld:Name>generic</sld:Name>
            <sld:Title>Generic</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:Abstract>Generic style</sld:Abstract>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>raster</sld:Name>
                    <sld:Title>Opaque Raster</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:Function name="isCoverage"/>
                            <ogc:Literal>true</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:RasterSymbolizer>
                        <sld:ContrastEnhancement/>
                    </sld:RasterSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Polygon</sld:Name>
                    <sld:Title>Grey Polygon</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:Function name="dimension">
                                <ogc:Function name="geometry"/>
                            </ogc:Function>
                            <ogc:Literal>2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#AAAAAA</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Line</sld:Name>
                    <sld:Title>Blue Line</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:Function name="dimension">
                                <ogc:Function name="geometry"/>
                            </ogc:Function>
                            <ogc:Literal>1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>point</sld:Name>
                    <sld:Title>Red Square Point</sld:Title>
                    <sld:ElseFilter/>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FF0000</sld:CssParameter>
                                </sld:Fill>
                            </sld:Mark>
                            <sld:Size>6</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:VendorOption name="ruleEvaluation">first</sld:VendorOption>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

