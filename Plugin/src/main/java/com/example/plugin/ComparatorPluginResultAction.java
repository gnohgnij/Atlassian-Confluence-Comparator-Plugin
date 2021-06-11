package com.example.plugin;

import com.atlassian.confluence.core.ConfluenceActionSupport;
import com.opensymphony.xwork.Action;

public class ComparatorPluginResultAction extends ConfluenceActionSupport {
    
    private String pageVersion1;
    private String pageVersion2;

    public String execute() throws Exception {
        return Action.SUCCESS;
    }

    public String getPageVersion1() {
        return this.pageVersion1;
    }

    public String getPageVersion2(){
        return this.pageVersion2;
    }

    public void setPageVersion1(String pageVersion1){
        this.pageVersion1 = pageVersion1;
    }

    public void setPageVersion2(String pageVersion2){
        this.pageVersion2 = pageVersion2;
    }

}