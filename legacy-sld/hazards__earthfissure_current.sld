<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:earthfissure_current</sld:Name>
        <sld:UserStyle>
            <sld:Name>hazards_earthfissure_style</sld:Name>
            <sld:Title>Earth Fissure Hazard</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Well_Located_Earth_Fissure</sld:Name>
                    <sld:Title>Well Located Earth Fissure</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>efhhazardunit</ogc:PropertyName>
                            <ogc:Literal>WLFefh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#e60000</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.6666666666666665</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Suspected_Earth_Fissure</sld:Name>
                    <sld:Title>Suspected Earth Fissure</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>efhhazardunit</ogc:PropertyName>
                            <ogc:Literal>SFefh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#a87000</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.6666666666666665</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>Lineament_of_Unknown_Origin</sld:Name>
                    <sld:Title>Lineament of Unknown Origin</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>efhhazardunit</ogc:PropertyName>
                            <ogc:Literal>Lefh</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#70a800</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">2.6666666666666665</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

